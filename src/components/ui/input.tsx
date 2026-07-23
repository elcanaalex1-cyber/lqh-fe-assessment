import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-10 w-full rounded-md border border-[#cdd5e3] bg-white px-3 text-sm text-brand-navy outline-none transition-colors focus:border-brand-aqua disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
