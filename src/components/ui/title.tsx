import { cn } from "@/lib/Utils";
import React from "react";

// Define the interface for the props
interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <h2 className={cn("uppercase text-2xl w-full lg:w-11/12 xl:w-3/4 md:text-4xl lg:text-5xl leading-normal md:leading-[55.02px] lg:leading-[60px] font-bold font-primary relative inline-block group", className)}>
      {title}
    </h2>
  );
};

export default Title;
