import {
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  isDateDisabled,
  formatDate,
  parseDate,
  normalizeRange,
} from '../utils';

describe('utility functions', () => {
  describe('isDateInRange', () => {
    test('should return true for date within range', () => {
      const range = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 20),
      };
      const date = new Date(2024, 0, 15);
      
      expect(isDateInRange(date, range)).toBe(true);
    });

    test('should return false for date outside range', () => {
      const range = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 20),
      };
      const date = new Date(2024, 0, 25);
      
      expect(isDateInRange(date, range)).toBe(false);
    });

    test('should return false for incomplete range', () => {
      const range = {
        start: new Date(2024, 0, 10),
        end: null,
      };
      const date = new Date(2024, 0, 15);
      
      expect(isDateInRange(date, range)).toBe(false);
    });
  });

  describe('isRangeStart', () => {
    test('should return true for range start date', () => {
      const range = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 20),
      };
      
      expect(isRangeStart(new Date(2024, 0, 10), range)).toBe(true);
      expect(isRangeStart(new Date(2024, 0, 15), range)).toBe(false);
    });
  });

  describe('isRangeEnd', () => {
    test('should return true for range end date', () => {
      const range = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 20),
      };
      
      expect(isRangeEnd(new Date(2024, 0, 20), range)).toBe(true);
      expect(isRangeEnd(new Date(2024, 0, 15), range)).toBe(false);
    });
  });

  describe('isDateDisabled', () => {
    test('should return true for date before minDate', () => {
      const minDate = new Date(2024, 0, 10);
      const date = new Date(2024, 0, 5);
      
      expect(isDateDisabled(date, minDate)).toBe(true);
    });

    test('should return true for date after maxDate', () => {
      const maxDate = new Date(2024, 0, 20);
      const date = new Date(2024, 0, 25);
      
      expect(isDateDisabled(date, undefined, maxDate)).toBe(true);
    });

    test('should return true for disabled specific dates', () => {
      const disabledDates = [new Date(2024, 0, 15)];
      const date = new Date(2024, 0, 15);
      
      expect(isDateDisabled(date, undefined, undefined, disabledDates)).toBe(true);
    });

    test('should return true for disabled days of week', () => {
      const disabledDaysOfWeek = [0, 6]; // Sunday and Saturday
      const sunday = new Date(2024, 0, 7); // This is a Sunday
      
      expect(isDateDisabled(sunday, undefined, undefined, [], disabledDaysOfWeek)).toBe(true);
    });

    test('should return false for valid date', () => {
      const date = new Date(2024, 0, 15);
      
      expect(isDateDisabled(date)).toBe(false);
    });
  });

  describe('formatDate', () => {
    test('should format date correctly', () => {
      const date = new Date(2024, 0, 15);
      
      expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-01-15');
      expect(formatDate(date, 'MMM d, yyyy')).toBe('Jan 15, 2024');
    });

    test('should return empty string for invalid format', () => {
      const date = new Date(2024, 0, 15);
      
      expect(formatDate(date, 'invalid-format')).toBe('');
    });
  });

  describe('parseDate', () => {
    test('should parse date correctly', () => {
      const expected = new Date(2024, 0, 15);
      
      expect(parseDate('2024-01-15', 'yyyy-MM-dd')).toEqual(expected);
    });

    test('should return null for invalid date string', () => {
      expect(parseDate('invalid-date', 'yyyy-MM-dd')).toBe(null);
    });
  });

  describe('normalizeRange', () => {
    test('should keep range in correct order', () => {
      const start = new Date(2024, 0, 10);
      const end = new Date(2024, 0, 20);
      
      const result = normalizeRange(start, end);
      expect(result.start).toEqual(start);
      expect(result.end).toEqual(end);
    });

    test('should swap dates if start is after end', () => {
      const start = new Date(2024, 0, 20);
      const end = new Date(2024, 0, 10);
      
      const result = normalizeRange(start, end);
      expect(result.start).toEqual(end);
      expect(result.end).toEqual(start);
    });
  });
});
