import React, { useState } from "react";
import { TooltipWrapper } from "@/component/modals/Tooltip";

interface CustomTextProps {
  text: string;
  textClass: string;
  maxChars: number;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  textClass,
  maxChars,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isTextLong = text.length > maxChars;
  const displayedText = isTextLong ? text.slice(0, maxChars) + "..." : text;

  return (
    <div
      onMouseEnter={() => isTextLong && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {isTextLong ? (
        <TooltipWrapper tooltip={text}>
          <div className={textClass}>{displayedText}</div>
        </TooltipWrapper>
      ) : (
        <div className={textClass}>{text}</div>
      )}
    </div>
  );
};

export default CustomText;
