import { cn } from "@/lib/Utils";
import React, { ReactNode } from "react";

// Define the interface for the props
interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <article className={cn("leading-6 text-[14px] font-semibold font-tertiary", className)}>
      {children}
    </article>
  );
};

export default Paragraph;
