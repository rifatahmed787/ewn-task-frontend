import { cn } from "@/lib/Utils";
import React, { ReactNode } from "react";

// Define the interface for the props
interface HeadingProps {
  className?: string;
  children: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ className, children }) => {
  return (
    <h1 className={cn("uppercase text-xl md:text-2xl font-bold font-primary relative inline-block group", className)}>
      {children}
      <span className="heading-underline"></span>
    </h1>
  );
};

export default Heading;
