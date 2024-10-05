
import { FC, ReactNode } from "react";
import { cn } from "@/lib/Utils";
import Heading from "../ui/heading";

interface IInfoWrapperProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

const InfoWrapper: FC<IInfoWrapperProps> = ({
  heading,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "border overflow-hidden rounded-md my-8 duration-150 transition-all",
        className
      )}
    >
      <div className="border-b bg-muted">
        <Heading className="py-1 px-4">
          {heading}
        </Heading>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
};

export default InfoWrapper;
