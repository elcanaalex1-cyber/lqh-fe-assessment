import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { UserFilters, UserStatus } from "@/data/users";
import calendarIcon from "@/assets/icons/np_calendar_2080577_000000 1.svg";
import { ChevronDown } from "lucide-react";

export function UserFilterForm({
  value,
  setValue,
  onReset,
  onApply,
}: {
  value: UserFilters;
  setValue: (value: UserFilters) => void;
  onReset: () => void;
  onApply: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onApply();
      }}
      className="space-y-4 text-sm"
    >
      <FilterField label="Organization">
        <Select
          value={value.organization}
          onChange={(organization) => setValue({ ...value, organization })}
        >
          <option value="">Select</option>
          <option>Lendsqr</option>
          <option>Irorun</option>
          <option>Lendstar</option>
        </Select>
      </FilterField>
      <FilterField label="Username">
        <Input
          placeholder="User"
          value={value.username}
          onChange={(event) =>
            setValue({ ...value, username: event.target.value })
          }
          className="h-[36px] rounded-lg font-normal border-[#cdd5e3] font-work px-5 text-xs"
        />
      </FilterField>
      <FilterField label="Email">
        <Input
          type="email"
          placeholder="Email"
          value={value.email}
          onChange={(event) =>
            setValue({ ...value, email: event.target.value })
          }
          className="h-[36px] rounded-lg font-normal border-[#cdd5e3] font-work px-5 text-xs"
        />
      </FilterField>
      <FilterField label="Date">
        <CustomDatePicker
          value={value.date}
          onChange={(date) => setValue({ ...value, date })}
        />
      </FilterField>
      <FilterField label="Phone Number">
        <Input
          inputMode="tel"
          placeholder="Phone Number"
          value={value.phone}
          onChange={(event) =>
            setValue({ ...value, phone: event.target.value })
          }
          className="h-[36px] rounded-lg font-normal border-[#cdd5e3] font-work px-5 text-xs"
        />
      </FilterField>
      <FilterField label="Status">
        <Select
          value={value.status}
          onChange={(status) =>
            setValue({ ...value, status: status as UserStatus | "" })
          }
        >
          <option value="">Select</option>
          {["Active", "Inactive", "Pending", "Blacklisted"].map((status) => (
            <option key={status}>{status}</option>
          ))}
        </Select>
      </FilterField>
      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          className="h-9 flex-1 rounded-lg font-normal text-xs"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button type="submit" className="h-9 flex-1 rounded-lg font-normal text-xs">
          Filter
        </Button>
      </div>
    </form>
  );
}

function CustomDatePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (date: string) => void;
}) {
  const selected = parseDate(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Choose date joined"
          className="flex h-9 w-full items-center rounded-lg border border-[#cdd5e3] bg-white px-5 text-left text-xs font-normal text-brand-muted transition-colors hover:border-brand-aqua focus:border-brand-aqua focus:outline-none"
        >
          <span className={value ? "text-brand-navy" : "text-[#8f9ab5]"}>
            {selected
              ? selected.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Date"}
          </span>
          <img src={calendarIcon} alt="" className="ml-auto size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={6}
        collisionPadding={16}
        avoidCollisions
        sticky="always"
        className="max-h-[calc(100dvh-32px)] w-auto max-w-[calc(100vw-32px)] overflow-auto p-0"
      >
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? new Date(2020, 3, 1)}
          onSelect={(date) => date && onChange(toDateValue(date))}
          captionLayout="dropdown"
          startMonth={new Date(2010, 0, 1)}
          endMonth={new Date()}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="w-full border-t py-3 text-xs font-medium text-brand-aqua hover:underline"
          >
            Clear date
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}

function parseDate(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block font-medium text-brand-muted">
      <span className="mb-2 block text-xs">{label}</span>
      {children}
    </label>
  );
}
function Select({
  value,
  onChange,
  children,
}: {
  value?: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[36px] w-full appearance-none rounded-lg border font-normal border-[#cdd5e3] font-work bg-white px-5 pr-12 text-xs text-brand-muted outline-none transition-colors focus:border-brand-aqua"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2"
        strokeWidth={1.5}
      />
    </div>
  );
}
