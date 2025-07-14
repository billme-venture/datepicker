import { combineDateAndTime, formatTime, generateHourOptions, generateMinuteOptions } from '../utils';

describe('Time utilities', () => {
  test('should combine date and time correctly', () => {
    const date = new Date(2024, 0, 15); // January 15, 2024
    const combined = combineDateAndTime(date, 14, 30, 45);
    
    expect(combined.getFullYear()).toBe(2024);
    expect(combined.getMonth()).toBe(0);
    expect(combined.getDate()).toBe(15);
    expect(combined.getHours()).toBe(14);
    expect(combined.getMinutes()).toBe(30);
    expect(combined.getSeconds()).toBe(45);
    expect(combined.getMilliseconds()).toBe(0);
  });

  test('should format time in 24h format', () => {
    const date = new Date(2024, 0, 15, 14, 30, 45);
    
    expect(formatTime(date, '24h', false)).toBe('14:30');
    expect(formatTime(date, '24h', true)).toBe('14:30:45');
  });

  test('should format time in 12h format', () => {
    const date1 = new Date(2024, 0, 15, 14, 30, 45); // 2:30:45 PM
    const date2 = new Date(2024, 0, 15, 2, 30, 45);  // 2:30:45 AM
    const date3 = new Date(2024, 0, 15, 0, 30, 45);  // 12:30:45 AM
    const date4 = new Date(2024, 0, 15, 12, 30, 45); // 12:30:45 PM
    
    expect(formatTime(date1, '12h', false)).toBe('02:30 PM');
    expect(formatTime(date1, '12h', true)).toBe('02:30:45 PM');
    expect(formatTime(date2, '12h', false)).toBe('02:30 AM');
    expect(formatTime(date3, '12h', false)).toBe('12:30 AM');
    expect(formatTime(date4, '12h', false)).toBe('12:30 PM');
  });

  test('should generate hour options correctly', () => {
    const hours24 = generateHourOptions('24h');
    const hours12 = generateHourOptions('12h');
    
    expect(hours24).toHaveLength(24);
    expect(hours24[0]).toBe(0);
    expect(hours24[23]).toBe(23);
    
    expect(hours12).toHaveLength(12);
    expect(hours12[0]).toBe(1);
    expect(hours12[11]).toBe(12);
  });

  test('should generate minute options with different steps', () => {
    const minutes1 = generateMinuteOptions(1);
    const minutes5 = generateMinuteOptions(5);
    const minutes15 = generateMinuteOptions(15);
    
    expect(minutes1).toHaveLength(60);
    expect(minutes5).toHaveLength(12);
    expect(minutes15).toHaveLength(4);
    
    expect(minutes5).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    expect(minutes15).toEqual([0, 15, 30, 45]);
  });
});
