export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarDay {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarMonth {
  year: number;
  month: number;
  weeks: CalendarWeek[];
}

export type SelectionMode = 'single' | 'range' | 'multiple';

export interface TimeConfig {
  enableTime?: boolean;
  timeFormat?: '12h' | '24h';
  minuteStep?: number;
  showSeconds?: boolean;
}

export interface DatePickerConfig {
  mode: SelectionMode;
  selectedDate?: Date | null;
  selectedDates?: Date[];
  selectedRange?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDaysOfWeek?: number[]; // 0-6, Sunday to Saturday
  firstDayOfWeek?: number; // 0-6, Sunday to Saturday
  locale?: string;
  time?: TimeConfig;
}

export interface DatePickerState {
  currentMonth: number;
  currentYear: number;
  selectedDate: Date | null;
  selectedDates: Date[];
  selectedRange: DateRange;
  hoveredDate: Date | null;
  isOpen: boolean;
}

export interface DatePickerActions {
  selectDate: (date: Date) => void;
  selectRange: (start: Date, end?: Date) => void;
  addDate: (date: Date) => void;
  removeDate: (date: Date) => void;
  clearSelection: () => void;
  setHoveredDate: (date: Date | null) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  goToToday: () => void;
  goToMonth: (year: number, month: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
  setTime: (hours: number, minutes: number, seconds?: number) => void;
  selectDateAndTime: (date: Date, hours: number, minutes: number, seconds?: number) => void;
}

export interface DatePickerReturn extends DatePickerState, DatePickerActions {
  calendar: CalendarMonth;
  isDateDisabled: (date: Date) => boolean;
  isDateSelected: (date: Date) => boolean;
  isDateInRange: (date: Date) => boolean;
  formatDate: (date: Date, format?: string) => string;
  parseDate: (dateString: string, format?: string) => Date | null;
}
