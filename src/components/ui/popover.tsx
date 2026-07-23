import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = ({
  className,
  align = "start",
  sideOffset = 8,
  ...props
}: PopoverPrimitive.PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded border border-[#e6e9ee] bg-white p-5 shadow-[3px_5px_20px_rgba(0,0,0,.12)] outline-none",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
