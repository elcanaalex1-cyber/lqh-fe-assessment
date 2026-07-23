import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 text-brand-muted [--rdp-accent-background-color:#e8fbfb] [--rdp-accent-color:#39cdcc]",
        className,
      )}
      classNames={{
        months: "flex flex-col",
        month: "space-y-3",
        month_caption: "flex min-h-9 items-center justify-center",
        caption_label: "text-sm font-medium text-brand-navy",
        dropdowns: "flex items-center justify-center gap-2",
        dropdown_root:
          "relative rounded-md border border-[#d5dbe7] bg-white px-2 py-1",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-3 top-3 flex items-center justify-between",
        button_previous:
          "grid size-8 place-items-center rounded-md hover:bg-slate-100",
        button_next:
          "grid size-8 place-items-center rounded-md hover:bg-slate-100",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 py-1 text-center text-[10px] font-medium text-brand-muted",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center text-xs",
        day_button:
          "grid size-9 place-items-center rounded-full transition hover:bg-brand-aqua/15",
        selected:
          "rounded-full bg-brand-aqua text-white hover:bg-brand-aqua",
        today: "font-semibold text-brand-navy ring-1 ring-brand-aqua/50",
        outside: "text-brand-muted/35",
        disabled: "pointer-events-none opacity-30",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
