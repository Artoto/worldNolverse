import React, { useState } from "react";
import { TooltipWrapper } from "@/component/modals/Tooltip";

interface CustomTagPProps {
  text: string;
  textClass: string;
  maxChars: number;
}

const CustomTagP: React.FC<CustomTagPProps> = ({
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
          <p className={textClass}>{displayedText}</p>
        </TooltipWrapper>
      ) : (
        <p className={textClass}>{text}</p>
      )}
    </div>
  );
};

export default CustomTagP;
