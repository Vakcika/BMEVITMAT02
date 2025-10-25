import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export default function DateFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Try to read start_date / end_date from URL
  const urlStart = searchParams.get("start_date");
  const urlEnd = searchParams.get("end_date");

  const parsedStart = urlStart ? new Date(urlStart) : undefined;
  const parsedEnd = urlEnd ? new Date(urlEnd) : undefined;

  // Only set initial range if URL params exist
  const initialRange: DateRange = {
    from: parsedStart,
    to: parsedEnd,
  };

  const [dateRange, setDateRange] = React.useState<DateRange>(initialRange);

  const applyRangeToUrl = (range: DateRange | undefined) => {
    const next = new URLSearchParams(searchParams.toString());

    if (range?.from) {
      next.set("start_date", format(range.from, "yyyy-MM-dd"));
    } else {
      next.delete("start_date");
    }

    if (range?.to) {
      next.set("end_date", format(range.to, "yyyy-MM-dd"));
    } else {
      next.delete("end_date");
    }

    setSearchParams(next, { replace: true });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    const normalized: DateRange = {
      from: range?.from ?? undefined,
      to: range?.to ?? undefined,
    };

    setDateRange(normalized);
    applyRangeToUrl(normalized);
  };

  const clearRange = () => {
    const normalized: DateRange = { from: undefined, to: undefined };
    setDateRange(normalized);
    const next = new URLSearchParams(searchParams.toString());
    next.delete("start_date");
    next.delete("end_date");
    setSearchParams(next, { replace: true });
  };

  const displayLabel = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "LLL dd, y")} - ${format(
        dateRange.to,
        "LLL dd, y"
      )}`;
    }
    if (dateRange?.from) {
      return format(dateRange.from, "LLL dd, y");
    }
    return "Select date range";
  };

  const today = new Date();

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="truncate">{displayLabel()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
            <div className="mt-2 flex justify-between">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const startOfMonth = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                  );
                  const preset: DateRange = { from: startOfMonth, to: today };
                  setDateRange(preset);
                  applyRangeToUrl(preset);
                }}
              >
                This month
              </Button>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={clearRange}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Optional inline Clear button shown when active */}
      {(dateRange?.from || dateRange?.to) && (
        <Button variant="ghost" size="sm" onClick={clearRange}>
          Clear
        </Button>
      )}
    </div>
  );
}
