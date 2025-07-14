import { renderHook, act } from '@testing-library/react';
import { useDatePicker } from '../useDatePicker';

describe('useDatePicker', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useDatePicker());
    
    expect(result.current.selectedDate).toBe(null);
    expect(result.current.selectedDates).toEqual([]);
    expect(result.current.selectedRange).toEqual({ start: null, end: null });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.hoveredDate).toBe(null);
  });

  test('should select a date in single mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'single' }));
    const testDate = new Date(2024, 0, 15);
    
    act(() => {
      result.current.selectDate(testDate);
    });
    
    expect(result.current.selectedDate).toEqual(testDate);
    expect(result.current.isOpen).toBe(false);
  });

  test('should select multiple dates in multiple mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'multiple' }));
    const date1 = new Date(2024, 0, 15);
    const date2 = new Date(2024, 0, 20);
    
    act(() => {
      result.current.selectDate(date1);
    });
    
    act(() => {
      result.current.selectDate(date2);
    });
    
    expect(result.current.selectedDates).toHaveLength(2);
    expect(result.current.selectedDates).toContain(date1);
    expect(result.current.selectedDates).toContain(date2);
  });

  test('should deselect a date when clicked again in multiple mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'multiple' }));
    const testDate = new Date(2024, 0, 15);
    
    act(() => {
      result.current.selectDate(testDate);
    });
    
    expect(result.current.selectedDates).toHaveLength(1);
    
    act(() => {
      result.current.selectDate(testDate);
    });
    
    expect(result.current.selectedDates).toHaveLength(0);
  });

  test('should select a range in range mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'range' }));
    const startDate = new Date(2024, 0, 15);
    const endDate = new Date(2024, 0, 20);
    
    act(() => {
      result.current.selectDate(startDate);
    });
    
    expect(result.current.selectedRange.start).toEqual(startDate);
    expect(result.current.selectedRange.end).toBe(null);
    
    act(() => {
      result.current.selectDate(endDate);
    });
    
    expect(result.current.selectedRange.start).toEqual(startDate);
    expect(result.current.selectedRange.end).toEqual(endDate);
    expect(result.current.isOpen).toBe(false);
  });

  test('should navigate between months', () => {
    const { result } = renderHook(() => useDatePicker());
    const initialMonth = result.current.currentMonth;
    const initialYear = result.current.currentYear;
    
    act(() => {
      result.current.goToNextMonth();
    });
    
    if (initialMonth === 11) {
      expect(result.current.currentMonth).toBe(0);
      expect(result.current.currentYear).toBe(initialYear + 1);
    } else {
      expect(result.current.currentMonth).toBe(initialMonth + 1);
      expect(result.current.currentYear).toBe(initialYear);
    }
    
    act(() => {
      result.current.goToPreviousMonth();
    });
    
    expect(result.current.currentMonth).toBe(initialMonth);
    expect(result.current.currentYear).toBe(initialYear);
  });

  test('should go to today', () => {
    const { result } = renderHook(() => useDatePicker());
    const today = new Date();
    
    act(() => {
      result.current.goToToday();
    });
    
    expect(result.current.currentMonth).toBe(today.getMonth());
    expect(result.current.currentYear).toBe(today.getFullYear());
  });

  test('should go to today and set date in single mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'single' }));
    
    act(() => {
      result.current.goToToday();
    });
    
    const today = new Date();
    expect(result.current.selectedDate).toBeDefined();
    expect(result.current.selectedDate!.getFullYear()).toBe(today.getFullYear());
    expect(result.current.selectedDate!.getMonth()).toBe(today.getMonth());
    expect(result.current.selectedDate!.getDate()).toBe(today.getDate());
    expect(result.current.currentYear).toBe(today.getFullYear());
    expect(result.current.currentMonth).toBe(today.getMonth());
  });

  test('should go to today and start range in range mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'range' }));
    
    act(() => {
      result.current.goToToday();
    });
    
    const today = new Date();
    expect(result.current.selectedRange.start).toBeDefined();
    expect(result.current.selectedRange.start!.getFullYear()).toBe(today.getFullYear());
    expect(result.current.selectedRange.start!.getMonth()).toBe(today.getMonth());
    expect(result.current.selectedRange.start!.getDate()).toBe(today.getDate());
    expect(result.current.selectedRange.end).toBe(null);
    expect(result.current.currentYear).toBe(today.getFullYear());
    expect(result.current.currentMonth).toBe(today.getMonth());
  });

  test('should go to today and add date in multiple mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'multiple' }));
    
    act(() => {
      result.current.goToToday();
    });
    
    const today = new Date();
    expect(result.current.selectedDates).toHaveLength(1);
    expect(result.current.selectedDates[0].getFullYear()).toBe(today.getFullYear());
    expect(result.current.selectedDates[0].getMonth()).toBe(today.getMonth());
    expect(result.current.selectedDates[0].getDate()).toBe(today.getDate());
    expect(result.current.currentYear).toBe(today.getFullYear());
    expect(result.current.currentMonth).toBe(today.getMonth());
  });

  test('should not add duplicate today in multiple mode', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'multiple' }));
    
    // First call to goToToday
    act(() => {
      result.current.goToToday();
    });
    
    expect(result.current.selectedDates).toHaveLength(1);
    
    // Second call to goToToday should not add duplicate
    act(() => {
      result.current.goToToday();
    });
    
    expect(result.current.selectedDates).toHaveLength(1);
  });

  test('should go to today with time when time is enabled', () => {
    const { result } = renderHook(() => useDatePicker({ 
      mode: 'single',
      time: { enableTime: true }
    }));
    
    act(() => {
      result.current.goToToday();
    });
    
    const now = new Date();
    expect(result.current.selectedDate).toBeDefined();
    expect(result.current.selectedDate!.getFullYear()).toBe(now.getFullYear());
    expect(result.current.selectedDate!.getMonth()).toBe(now.getMonth());
    expect(result.current.selectedDate!.getDate()).toBe(now.getDate());
    // Should include current time
    expect(result.current.selectedDate!.getHours()).toBe(now.getHours());
    expect(result.current.selectedDate!.getMinutes()).toBe(now.getMinutes());
  });

  test('should clear selection', () => {
    const { result } = renderHook(() => useDatePicker({ mode: 'multiple' }));
    const testDate = new Date(2024, 0, 15);
    
    act(() => {
      result.current.selectDate(testDate);
    });
    
    expect(result.current.selectedDates).toHaveLength(1);
    
    act(() => {
      result.current.clearSelection();
    });
    
    expect(result.current.selectedDate).toBe(null);
    expect(result.current.selectedDates).toEqual([]);
    expect(result.current.selectedRange).toEqual({ start: null, end: null });
  });

  test('should toggle open state', () => {
    const { result } = renderHook(() => useDatePicker());
    
    expect(result.current.isOpen).toBe(false);
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(false);
  });

  test('should respect disabled dates', () => {
    const disabledDate = new Date(2024, 0, 15);
    const { result } = renderHook(() => 
      useDatePicker({ 
        disabledDates: [disabledDate]
      })
    );
    
    expect(result.current.isDateDisabled(disabledDate)).toBe(true);
    expect(result.current.isDateDisabled(new Date(2024, 0, 16))).toBe(false);
    
    act(() => {
      result.current.selectDate(disabledDate);
    });
    
    expect(result.current.selectedDate).toBe(null);
  });

  test('should respect min and max dates', () => {
    const minDate = new Date(2024, 0, 10);
    const maxDate = new Date(2024, 0, 20);
    const { result } = renderHook(() => 
      useDatePicker({ 
        minDate,
        maxDate
      })
    );
    
    expect(result.current.isDateDisabled(new Date(2024, 0, 5))).toBe(true);
    expect(result.current.isDateDisabled(new Date(2024, 0, 25))).toBe(true);
    expect(result.current.isDateDisabled(new Date(2024, 0, 15))).toBe(false);
  });

  test('should format and parse dates', () => {
    const { result } = renderHook(() => useDatePicker());
    const testDate = new Date(2024, 0, 15);
    
    const formatted = result.current.formatDate(testDate, 'yyyy-MM-dd');
    expect(formatted).toBe('2024-01-15');
    
    const parsed = result.current.parseDate('2024-01-15', 'yyyy-MM-dd');
    expect(parsed).toEqual(testDate);
  });

  test('should handle time selection when enabled', () => {
    const { result } = renderHook(() => 
      useDatePicker({ 
        mode: 'single',
        time: { enableTime: true }
      })
    );
    
    const testDate = new Date(2024, 0, 15, 10, 30, 0);
    
    act(() => {
      result.current.selectDate(testDate);
    });
    
    expect(result.current.selectedDate).toEqual(testDate);
    
    // Test setTime functionality
    act(() => {
      result.current.setTime(14, 45, 30);
    });
    
    expect(result.current.selectedDate?.getHours()).toBe(14);
    expect(result.current.selectedDate?.getMinutes()).toBe(45);
    expect(result.current.selectedDate?.getSeconds()).toBe(30);
  });

  test('should set current date and time when going to today with time enabled', () => {
    const { result } = renderHook(() => 
      useDatePicker({ 
        mode: 'single',
        time: { enableTime: true }
      })
    );
    
    const beforeToday = Date.now();
    
    act(() => {
      result.current.goToToday();
    });
    
    const afterToday = Date.now();
    
    expect(result.current.selectedDate).toBeTruthy();
    
    if (result.current.selectedDate) {
      const selectedTime = result.current.selectedDate.getTime();
      expect(selectedTime).toBeGreaterThanOrEqual(beforeToday);
      expect(selectedTime).toBeLessThanOrEqual(afterToday);
    }
  });

  test('should not set time when time is disabled', () => {
    const { result } = renderHook(() => 
      useDatePicker({ 
        mode: 'single',
        time: { enableTime: false }
      })
    );
    
    const testDate = new Date(2024, 0, 15, 10, 30, 0);
    
    act(() => {
      result.current.selectDate(testDate);
    });
    
    act(() => {
      result.current.setTime(14, 45, 30);
    });
    
    // Time should not change because enableTime is false
    expect(result.current.selectedDate?.getHours()).toBe(10);
    expect(result.current.selectedDate?.getMinutes()).toBe(30);
    expect(result.current.selectedDate?.getSeconds()).toBe(0);
  });

  test('should select date and time together', () => {
    const { result } = renderHook(() => 
      useDatePicker({ 
        mode: 'single',
        time: { enableTime: true }
      })
    );
    
    const testDate = new Date(2024, 0, 15);
    
    act(() => {
      result.current.selectDateAndTime(testDate, 14, 30, 45);
    });
    
    expect(result.current.selectedDate?.getFullYear()).toBe(2024);
    expect(result.current.selectedDate?.getMonth()).toBe(0);
    expect(result.current.selectedDate?.getDate()).toBe(15);
    expect(result.current.selectedDate?.getHours()).toBe(14);
    expect(result.current.selectedDate?.getMinutes()).toBe(30);
    expect(result.current.selectedDate?.getSeconds()).toBe(45);
    expect(result.current.isOpen).toBe(false);
  });
});
