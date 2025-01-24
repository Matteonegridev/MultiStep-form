import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `font-UbuntuMedium flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-4 text-base text-primary ring-offset-white placeholder:text-neutral-500 focus:outline-none focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
