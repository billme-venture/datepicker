import {
  format,
  parse,
  isValid,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  addMonths,
  subMonths,
  isAfter,
  isBefore,
  isWithinInterval,
} from 'date-fns';

import { CalendarDay, CalendarWeek, CalendarMonth, DateRange } from './types';

/**
 * Check if a date is within a range
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  
  try {
    return isWithinInterval(date, { start: range.start, end: range.end });
  } catch {
    return false;
  }
}

/**
 * Check if a date is the start of a range
 */
export function isRangeStart(date: Date, range: DateRange): boolean {
  return range.start ? isSameDay(date, range.start) : false;
}

/**
 * Check if a date is the end of a range
 */
export function isRangeEnd(date: Date, range: DateRange): boolean {
  return range.end ? isSameDay(date, range.end) : false;
}

/**
 * Check if a date is disabled based on constraints
 */
export function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates: Date[] = [],
  disabledDaysOfWeek: number[] = []
): boolean {
  // Check min/max dates
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isAfter(date, maxDate)) return true;
  
  // Check disabled specific dates
  if (disabledDates.some(disabledDate => isSameDay(date, disabledDate))) {
    return true;
  }
  
  // Check disabled days of week
  if (disabledDaysOfWeek.includes(date.getDay())) {
    return true;
  }
  
  return false;
}

/**
 * Create a calendar day object
 */
export function createCalendarDay(
  date: Date,
  currentMonth: number,
  selectedDate: Date | null,
  selectedDates: Date[],
  selectedRange: DateRange,
  hoveredDate: Date | null,
  minDate?: Date,
  maxDate?: Date,
  disabledDates: Date[] = [],
  disabledDaysOfWeek: number[] = []
): CalendarDay {
  const isCurrentMonth = isSameMonth(date, new Date(date.getFullYear(), currentMonth));
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : 
                    selectedDates.some(d => isSameDay(date, d));
  
  let isInRange = isDateInRange(date, selectedRange);
  
  // Handle hover state for range selection
  if (selectedRange.start && !selectedRange.end && hoveredDate) {
    const tempRange: DateRange = {
      start: selectedRange.start,
      end: hoveredDate
    };
    isInRange = isDateInRange(date, tempRange);
  }
  
  return {
    date,
    isToday: isToday(date),
    isCurrentMonth,
    isSelected,
    isInRange,
    isRangeStart: isRangeStart(date, selectedRange),
    isRangeEnd: isRangeEnd(date, selectedRange),
    isDisabled: isDateDisabled(date, minDate, maxDate, disabledDates, disabledDaysOfWeek)
  };
}

/**
 * Generate calendar month data
 */
export function generateCalendarMonth(
  year: number,
  month: number,
  selectedDate: Date | null,
  selectedDates: Date[],
  selectedRange: DateRange,
  hoveredDate: Date | null,
  firstDayOfWeek: number = 0,
  minDate?: Date,
  maxDate?: Date,
  disabledDates: Date[] = [],
  disabledDaysOfWeek: number[] = []
): CalendarMonth {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  const weeks: CalendarWeek[] = [];
  
  for (let i = 0; i < calendarDays.length; i += 7) {
    const weekDays = calendarDays.slice(i, i + 7).map((date: Date) =>
      createCalendarDay(
        date,
        month,
        selectedDate,
        selectedDates,
        selectedRange,
        hoveredDate,
        minDate,
        maxDate,
        disabledDates,
        disabledDaysOfWeek
      )
    );
    
    weeks.push({ days: weekDays });
  }
  
  return {
    year,
    month,
    weeks
  };
}

/**
 * Format a date using date-fns
 */
export function formatDate(date: Date, formatString: string = 'yyyy-MM-dd'): string {
  try {
    return format(date, formatString);
  } catch {
    return '';
  }
}

/**
 * Parse a date string using date-fns
 */
export function parseDate(dateString: string, formatString: string = 'yyyy-MM-dd'): Date | null {
  try {
    const parsed = parse(dateString, formatString, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Normalize a date range (ensure start <= end)
 */
export function normalizeRange(start: Date, end: Date): DateRange {
  if (isBefore(start, end) || isSameDay(start, end)) {
    return { start, end };
  }
  return { start: end, end: start };
}

/**
 * Get month boundaries for navigation
 */
export function getMonthBoundaries(year: number, month: number) {
  const current = new Date(year, month);
  const previous = subMonths(current, 1);
  const next = addMonths(current, 1);
  
  return {
    current,
    previous: { year: previous.getFullYear(), month: previous.getMonth() },
    next: { year: next.getFullYear(), month: next.getMonth() }
  };
}

/**
 * Combine date and time into a single Date object
 */
export function combineDateAndTime(date: Date, hours: number, minutes: number, seconds: number = 0): Date {
  const combined = new Date(date);
  combined.setHours(hours, minutes, seconds, 0);
  return combined;
}

/**
 * Format time for display
 */
export function formatTime(date: Date, format: '12h' | '24h' = '24h', showSeconds: boolean = false): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  if (format === '12h') {
    const isPM = hours >= 12;
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const timeString = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const secondsString = showSeconds ? `:${seconds.toString().padStart(2, '0')}` : '';
    const period = isPM ? 'PM' : 'AM';
    return `${timeString}${secondsString} ${period}`;
  } else {
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const secondsString = showSeconds ? `:${seconds.toString().padStart(2, '0')}` : '';
    return `${timeString}${secondsString}`;
  }
}

/**
 * Generate hour options for time picker
 */
export function generateHourOptions(format: '12h' | '24h' = '24h'): number[] {
  if (format === '12h') {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  } else {
    return Array.from({ length: 24 }, (_, i) => i);
  }
}

/**
 * Generate minute options for time picker
 */
export function generateMinuteOptions(step: number = 1): number[] {
  return Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step);
}
