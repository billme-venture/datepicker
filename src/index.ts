// Main hook
export { useDatePicker } from './useDatePicker';

// Types
export type {
  DateRange,
  CalendarDay,
  CalendarWeek,
  CalendarMonth,
  SelectionMode,
  TimeConfig,
  DatePickerConfig,
  DatePickerState,
  DatePickerActions,
  DatePickerReturn,
} from './types';

// Utility functions
export {
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  isDateDisabled,
  createCalendarDay,
  generateCalendarMonth,
  formatDate,
  parseDate,
  normalizeRange,
  getMonthBoundaries,
  combineDateAndTime,
  formatTime,
  generateHourOptions,
  generateMinuteOptions,
} from './utils';

// Example components (optional, for demonstration)
export {
  SimpleCalendar,
  RangePicker,
  MultiSelectCalendar,
} from './examples';

// Time picker component
export { TimePicker } from './TimePicker';
