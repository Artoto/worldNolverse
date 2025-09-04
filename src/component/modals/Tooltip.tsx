"use client";

import React, { useState, useRef, useEffect } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipTrigger = "hover" | "click" | "focus";

interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  tooltipClassName?: string;
  arrow?: boolean;
  disabled?: boolean;
  maxWidth?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  trigger = "hover",
  delay = 200,
  children,
  className = "",
  tooltipClassName = "",
  arrow = true,
  disabled = false,
  maxWidth = "max-w-xs",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [actualPosition, setActualPosition] =
    useState<TooltipPosition>(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // คำนวณตำแหน่ง tooltip ให้อยู่ในหน้าจอ
  const calculatePosition = (): void => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapper = wrapperRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let newPosition = position;

    // ตรวจสอบว่า tooltip จะเกินขอบหน้าจอหรือไม่
    switch (position) {
      case "top":
        if (wrapper.top - tooltip.height < 10) {
          newPosition = "bottom";
        }
        break;
      case "bottom":
        if (wrapper.bottom + tooltip.height > viewport.height - 10) {
          newPosition = "top";
        }
        break;
      case "left":
        if (wrapper.left - tooltip.width < 10) {
          newPosition = "right";
        }
        break;
      case "right":
        if (wrapper.right + tooltip.width > viewport.width - 10) {
          newPosition = "left";
        }
        break;
    }

    setActualPosition(newPosition);
  };

  const showTooltip = (): void => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // คำนวณตำแหน่งหลังจากแสดง tooltip
      setTimeout(calculatePosition, 10);
    }, delay);
  };

  const hideTooltip = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const handleClick = (): void => {
    if (disabled) return;

    if (trigger === "click") {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = (): void => {
    if (trigger === "focus" || trigger === "hover") {
      showTooltip();
    }
  };

  const handleBlur = (): void => {
    if (trigger === "focus" || trigger === "hover") {
      hideTooltip();
    }
  };

  // ปิด tooltip เมื่อคลิกข้างนอก (สำหรับ click trigger)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        trigger === "click" &&
        isVisible &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, trigger]);

  // CSS classes สำหรับตำแหน่งต่างๆ
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  // CSS classes สำหรับ arrow
  const arrowClasses = {
    top: "absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100",
    bottom:
      "absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-100",
    left: "absolute left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900 dark:border-l-gray-100",
    right:
      "absolute right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100",
  };

  const wrapperEvents = {
    ...(trigger === "hover" && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
    }),
    ...(trigger === "click" && {
      onClick: handleClick,
    }),
    ...(trigger === "focus" && {
      onFocus: handleFocus,
      onBlur: handleBlur,
    }),
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block ${className}`}
      {...wrapperEvents}
    >
      {children}

      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm font-medium text-white 
            bg-gray-900 dark:bg-gray-100 dark:text-gray-900 
            rounded-lg shadow-lg whitespace-nowrap 
            ${maxWidth} whitespace-pre-wrap break-words 
            ${positionClasses[actualPosition]}
            ${tooltipClassName}
            animate-in fade-in-0 zoom-in-95 duration-200
            data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 
            data-[state=closed]:zoom-out-95 
            data-[state=closed]:duration-200
          `}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
          {arrow && (
            <div className={arrowClasses[actualPosition]} aria-hidden="true" />
          )}
        </div>
      )}
    </div>
  );
};

// Higher-order component สำหรับการใช้งานที่ง่ายขึ้น
interface TooltipWrapperProps {
  tooltip: string;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  children: React.ReactNode;
  className?: string;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  tooltip,
  position = "top",
  trigger = "hover",
  children,
  className = "",
}) => {
  return (
    <Tooltip
      content={tooltip}
      position={position}
      trigger={trigger}
      className={className}
    >
      {children}
    </Tooltip>
  );
};

// Hook สำหรับ programmatic control
interface UseTooltipOptions {
  delay?: number;
  disabled?: boolean;
}

const useTooltip = (options: UseTooltipOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = (): void => {
    if (options.disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, options.delay || 0);
  };

  const hide = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const toggle = (): void => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

export default Tooltip;
export { TooltipWrapper, useTooltip };
export type { TooltipProps, TooltipPosition, TooltipTrigger };
