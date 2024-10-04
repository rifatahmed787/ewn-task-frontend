import { cn } from "@/lib/Utils";
import React from "react";

// Define the interface for the props
interface HeadingProps {
  Heading: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ Heading, className }) => {
  return (
    <h1 className={cn("uppercase text-3xl md:text-4xl font-bold font-primary relative inline-block group", className)}>
      {Heading}
      <span className="heading-underline"></span>
    </h1>
  );
};

export default Heading;
