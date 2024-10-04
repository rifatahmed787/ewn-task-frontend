import { cn } from "@/lib/Utils";
import React from "react";

// Define the interface for the props
interface SubTitleProps {
  SubTitle:string,
  className?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ SubTitle, className }) => {
  return (
    <h3 className={cn("font-bold text-xl md:text-[25px] lg:text-[30px] leading-[20px] md:leading-[25px] lg:leading-[35px] font-secondary", className)}>
      {SubTitle}
    </h3>
  );
};

export default SubTitle;
