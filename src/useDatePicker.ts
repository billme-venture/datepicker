import { useState, useMemo, useCallback } from 'react';
import {
  DatePickerConfig,
  DatePickerState,
  DatePickerReturn,
  SelectionMode,
  DateRange,
} from './types';
import {
  generateCalendarMonth,
  formatDate,
  parseDate,
  isDateDisabled,
  normalizeRange,
  getMonthBoundaries,
  combineDateAndTime,
} from './utils';
import { isSameDay, isWithinInterval } from 'date-fns';

const defaultConfig: Partial<DatePickerConfig> = {
  mode: 'single',
  firstDayOfWeek: 0,
  locale: 'en-US',
  disabledDates: [],
  disabledDaysOfWeek: [],
  time: {
    enableTime: false,
    timeFormat: '24h',
    minuteStep: 1,
    showSeconds: false,
  },
};

export function useDatePicker(userConfig: Partial<DatePickerConfig> = {}): DatePickerReturn {
  const config = { ...defaultConfig, ...userConfig } as DatePickerConfig;
  
  // Initialize state based on mode and provided values
  const getInitialState = (): DatePickerState => {
    const now = new Date();
    
    return {
      currentMonth: now.getMonth(),
      currentYear: now.getFullYear(),
      selectedDate: config.selectedDate || null,
      selectedDates: config.selectedDates || [],
      selectedRange: config.selectedRange || { start: null, end: null },
      hoveredDate: null,
      isOpen: false,
    };
  };

  const [state, setState] = useState<DatePickerState>(getInitialState);

  // Helper function to check if a date is disabled
  const checkIsDateDisabled = useCallback(
    (date: Date): boolean => {
      return isDateDisabled(
        date,
        config.minDate,
        config.maxDate,
        config.disabledDates,
        config.disabledDaysOfWeek
      );
    },
    [config.minDate, config.maxDate, config.disabledDates, config.disabledDaysOfWeek]
  );

  // Helper function to check if a date is selected
  const checkIsDateSelected = useCallback(
    (date: Date): boolean => {
      switch (config.mode) {
        case 'single':
          return state.selectedDate ? isSameDay(date, state.selectedDate) : false;
        case 'multiple':
          return state.selectedDates.some(d => isSameDay(date, d));
        case 'range':
          if (state.selectedRange.start && state.selectedRange.end) {
            return isWithinInterval(date, {
              start: state.selectedRange.start,
              end: state.selectedRange.end
            });
          }
          return state.selectedRange.start ? isSameDay(date, state.selectedRange.start) : false;
        default:
          return false;
      }
    },
    [config.mode, state.selectedDate, state.selectedDates, state.selectedRange]
  );

  // Helper function to check if a date is in range (for range mode)
  const checkIsDateInRange = useCallback(
    (date: Date): boolean => {
      if (config.mode !== 'range') return false;
      
      if (state.selectedRange.start && state.selectedRange.end) {
        return isWithinInterval(date, {
          start: state.selectedRange.start,
          end: state.selectedRange.end
        });
      }
      
      // Handle hover state
      if (state.selectedRange.start && state.hoveredDate) {
        const tempRange = normalizeRange(state.selectedRange.start, state.hoveredDate);
        return isWithinInterval(date, {
          start: tempRange.start!,
          end: tempRange.end!
        });
      }
      
      return false;
    },
    [config.mode, state.selectedRange, state.hoveredDate]
  );

  // Generate calendar data
  const calendar = useMemo(() => {
    return generateCalendarMonth(
      state.currentYear,
      state.currentMonth,
      state.selectedDate,
      state.selectedDates,
      state.selectedRange,
      state.hoveredDate,
      config.firstDayOfWeek,
      config.minDate,
      config.maxDate,
      config.disabledDates,
      config.disabledDaysOfWeek
    );
  }, [
    state.currentYear,
    state.currentMonth,
    state.selectedDate,
    state.selectedDates,
    state.selectedRange,
    state.hoveredDate,
    config.firstDayOfWeek,
    config.minDate,
    config.maxDate,
    config.disabledDates,
    config.disabledDaysOfWeek,
  ]);

  // Actions
  const selectDate = useCallback(
    (date: Date) => {
      if (checkIsDateDisabled(date)) return;

      setState(prev => {
        switch (config.mode) {
          case 'single':
            return {
              ...prev,
              selectedDate: date,
              isOpen: false,
            };
          case 'multiple':
            const isAlreadySelected = prev.selectedDates.some(d => isSameDay(date, d));
            return {
              ...prev,
              selectedDates: isAlreadySelected
                ? prev.selectedDates.filter(d => !isSameDay(date, d))
                : [...prev.selectedDates, date],
            };
          case 'range':
            if (!prev.selectedRange.start || prev.selectedRange.end) {
              // Start new range
              return {
                ...prev,
                selectedRange: { start: date, end: null },
              };
            } else {
              // Complete range
              const range = normalizeRange(prev.selectedRange.start, date);
              return {
                ...prev,
                selectedRange: range,
                isOpen: false,
              };
            }
          default:
            return prev;
        }
      });
    },
    [config.mode, checkIsDateDisabled]
  );

  const selectRange = useCallback(
    (start: Date, end?: Date) => {
      if (config.mode !== 'range') return;
      if (checkIsDateDisabled(start) || (end && checkIsDateDisabled(end))) return;

      setState(prev => ({
        ...prev,
        selectedRange: end ? normalizeRange(start, end) : { start, end: null },
      }));
    },
    [config.mode, checkIsDateDisabled]
  );

  const addDate = useCallback(
    (date: Date) => {
      if (config.mode !== 'multiple' || checkIsDateDisabled(date)) return;

      setState(prev => ({
        ...prev,
        selectedDates: [...prev.selectedDates, date],
      }));
    },
    [config.mode, checkIsDateDisabled]
  );

  const removeDate = useCallback(
    (date: Date) => {
      if (config.mode !== 'multiple') return;

      setState(prev => ({
        ...prev,
        selectedDates: prev.selectedDates.filter(d => !isSameDay(date, d)),
      }));
    },
    [config.mode]
  );

  const clearSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedDate: null,
      selectedDates: [],
      selectedRange: { start: null, end: null },
    }));
  }, []);

  const setHoveredDate = useCallback((date: Date | null) => {
    setState(prev => ({ ...prev, hoveredDate: date }));
  }, []);

  const goToNextMonth = useCallback(() => {
    setState(prev => {
      const { next } = getMonthBoundaries(prev.currentYear, prev.currentMonth);
      return {
        ...prev,
        currentYear: next.year,
        currentMonth: next.month,
      };
    });
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setState(prev => {
      const { previous } = getMonthBoundaries(prev.currentYear, prev.currentMonth);
      return {
        ...prev,
        currentYear: previous.year,
        currentMonth: previous.month,
      };
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setState(prev => {
      switch (config.mode) {
        case 'single':
          return {
            ...prev,
            currentYear: now.getFullYear(),
            currentMonth: now.getMonth(),
            selectedDate: now, // Always set to current date/time
          };
        case 'range':
          return {
            ...prev,
            currentYear: now.getFullYear(),
            currentMonth: now.getMonth(),
            selectedRange: { start: now, end: null }, // Start range with today
          };
        case 'multiple':
          // For multiple mode, add today to selection if not already selected
          const isAlreadySelected = prev.selectedDates.some(d => isSameDay(d, now));
          return {
            ...prev,
            currentYear: now.getFullYear(),
            currentMonth: now.getMonth(),
            selectedDates: isAlreadySelected 
              ? prev.selectedDates 
              : [...prev.selectedDates, now],
          };
        default:
          return {
            ...prev,
            currentYear: now.getFullYear(),
            currentMonth: now.getMonth(),
          };
      }
    });
  }, [config.mode]);

  const goToMonth = useCallback((year: number, month: number) => {
    setState(prev => ({
      ...prev,
      currentYear: year,
      currentMonth: month,
    }));
  }, []);

  const setIsOpen = useCallback((isOpen: boolean) => {
    setState(prev => ({ ...prev, isOpen }));
  }, []);

  const toggle = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const formatDateWrapper = useCallback(
    (date: Date, format?: string) => {
      return formatDate(date, format);
    },
    []
  );

  const parseDateWrapper = useCallback(
    (dateString: string, format?: string) => {
      return parseDate(dateString, format);
    },
    []
  );

  const setTime = useCallback(
    (hours: number, minutes: number, seconds: number = 0) => {
      if (!config.time?.enableTime) return;

      setState(prev => {
        if (config.mode === 'single' && prev.selectedDate) {
          return {
            ...prev,
            selectedDate: combineDateAndTime(prev.selectedDate, hours, minutes, seconds),
          };
        }
        return prev;
      });
    },
    [config.time?.enableTime, config.mode]
  );

  const selectDateAndTime = useCallback(
    (date: Date, hours: number, minutes: number, seconds: number = 0) => {
      if (checkIsDateDisabled(date)) return;

      const finalDate = config.time?.enableTime 
        ? combineDateAndTime(date, hours, minutes, seconds)
        : date;

      setState(prev => {
        switch (config.mode) {
          case 'single':
            return {
              ...prev,
              selectedDate: finalDate,
              isOpen: false,
            };
          default:
            // For range and multiple modes, fall back to regular selectDate behavior
            return prev;
        }
      });
    },
    [config.mode, config.time?.enableTime, checkIsDateDisabled]
  );

  return {
    // State
    ...state,
    
    // Calendar data
    calendar,
    
    // Helper functions
    isDateDisabled: checkIsDateDisabled,
    isDateSelected: checkIsDateSelected,
    isDateInRange: checkIsDateInRange,
    formatDate: formatDateWrapper,
    parseDate: parseDateWrapper,
    
    // Actions
    selectDate,
    selectRange,
    addDate,
    removeDate,
    clearSelection,
    setHoveredDate,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    goToMonth,
    setIsOpen,
    toggle,
    setTime,
    selectDateAndTime,
  };
}
