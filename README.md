# @billme-venture/headless-datepicker

A beautiful, headless datepicker for React applications. Built with TypeScript and designed to be fully customizable and accessible.

## Features

- **Headless Design**: Complete control over styling and UI
- **Multiple Selection Modes**: Single date, date range, and multiple dates
- **Time Selection**: Optional time picker with configurable format and precision
- **Enhanced Today Button**: Sets current date and time when time is enabled
- **Fully Accessible**: Built with accessibility in mind
- **TypeScript Support**: Full type safety and IntelliSense
- **Lightweight**: Minimal dependencies (only date-fns)
- **Flexible**: Highly customizable with powerful configuration options
- **SSR Compatible**: Works with Next.js and other SSR frameworks

## Installation

```bash
npm install @billme-venture/headless-datepicker
```

```bash
yarn add @billme-venture/headless-datepicker
```

```bash
pnpm add @billme-venture/headless-datepicker
```

## Quick Start

### Basic Single Date Picker

```tsx
import React from 'react';
import { useDatePicker } from '@billme-venture/headless-datepicker';

function MyDatePicker() {
  const datePicker = useDatePicker({
    mode: 'single'
  });

  return (
    <div>
      <button onClick={datePicker.toggle}>
        {datePicker.selectedDate 
          ? datePicker.formatDate(datePicker.selectedDate, 'MMM d, yyyy')
          : 'Select a date'
        }
      </button>
      
      {datePicker.isOpen && (
        <div className="calendar">
          {/* Calendar header */}
          <div className="calendar-header">
            <button onClick={datePicker.goToPreviousMonth}>←</button>
            <h3>{datePicker.currentMonth + 1}/{datePicker.currentYear}</h3>
            <button onClick={datePicker.goToNextMonth}>→</button>
          </div>
          
          {/* Calendar grid */}
          <div className="calendar-grid">
            {datePicker.calendar.weeks.map((week, weekIndex) =>
              week.days.map((day, dayIndex) => (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => datePicker.selectDate(day.date)}
                  disabled={day.isDisabled}
                  className={`
                    calendar-day
                    ${day.isSelected ? 'selected' : ''}
                    ${day.isToday ? 'today' : ''}
                    ${!day.isCurrentMonth ? 'other-month' : ''}
                  `}
                >
                  {day.date.getDate()}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Date Range Picker

```tsx
import React from 'react';
import { useDatePicker } from '@billme-venture/headless-datepicker';

function DateRangePicker() {
  const datePicker = useDatePicker({
    mode: 'range'
  });

  return (
    <div>
      <button onClick={datePicker.toggle}>
        {datePicker.selectedRange.start && datePicker.selectedRange.end
          ? `${datePicker.formatDate(datePicker.selectedRange.start, 'MMM d')} - ${datePicker.formatDate(datePicker.selectedRange.end, 'MMM d, yyyy')}`
          : 'Select date range'
        }
      </button>
      
      {datePicker.isOpen && (
        <div className="calendar">
          {/* Calendar implementation similar to above */}
          {datePicker.calendar.weeks.map((week, weekIndex) =>
            week.days.map((day, dayIndex) => (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => datePicker.selectDate(day.date)}
                onMouseEnter={() => datePicker.setHoveredDate(day.date)}
                disabled={day.isDisabled}
                className={`
                  calendar-day
                  ${day.isRangeStart || day.isRangeEnd ? 'range-endpoint' : ''}
                  ${day.isInRange ? 'in-range' : ''}
                `}
              >
                {day.date.getDate()}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
```

### DateTime Picker with Time Selection

```tsx
import React from 'react';
import { useDatePicker, TimePicker } from '@billme-venture/headless-datepicker';

function DateTimePicker() {
  const datePicker = useDatePicker({
    mode: 'single',
    time: {
      enableTime: true,
      timeFormat: '24h',
      minuteStep: 5,
      showSeconds: false,
    }
  });

  return (
    <div>
      <button onClick={datePicker.toggle}>
        {datePicker.selectedDate 
          ? `${datePicker.formatDate(datePicker.selectedDate, 'MMM d, yyyy')} ${datePicker.selectedDate.toLocaleTimeString()}`
          : 'Select date & time'
        }
      </button>
      
      {datePicker.isOpen && (
        <div className="datetime-picker">
          {/* Calendar implementation */}
          {datePicker.calendar.weeks.map((week, weekIndex) =>
            week.days.map((day, dayIndex) => (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => datePicker.selectDate(day.date)}
                disabled={day.isDisabled}
                className={day.isSelected ? 'selected' : ''}
              >
                {day.date.getDate()}
              </button>
            ))
          )}
          
          {/* Time Picker */}
          {datePicker.selectedDate && (
            <TimePicker
              selectedDate={datePicker.selectedDate}
              timeFormat="24h"
              minuteStep={5}
              onTimeChange={(hours, minutes, seconds) => {
                datePicker.setTime(hours, minutes, seconds);
              }}
            />
          )}
          
          <button onClick={datePicker.goToToday}>
            Now {/* This will set current date AND time */}
          </button>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### useDatePicker(config?)

The main hook that provides all datepicker functionality.

#### Configuration Options

```typescript
interface DatePickerConfig {
  mode: 'single' | 'range' | 'multiple';
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

interface TimeConfig {
  enableTime?: boolean;
  timeFormat?: '12h' | '24h';
  minuteStep?: number;
  showSeconds?: boolean;
}
```

#### Return Value

The hook returns an object with the following properties and methods:

##### State Properties

- `currentMonth: number` - Currently displayed month (0-11)
- `currentYear: number` - Currently displayed year
- `selectedDate: Date | null` - Selected date (single mode)
- `selectedDates: Date[]` - Selected dates (multiple mode)
- `selectedRange: DateRange` - Selected range (range mode)
- `hoveredDate: Date | null` - Currently hovered date
- `isOpen: boolean` - Whether the datepicker is open
- `calendar: CalendarMonth` - Calendar data for rendering

##### Action Methods

- `selectDate(date: Date): void` - Select a date
- `selectRange(start: Date, end?: Date): void` - Select a range
- `addDate(date: Date): void` - Add a date (multiple mode)
- `removeDate(date: Date): void` - Remove a date (multiple mode)
- `clearSelection(): void` - Clear all selections
- `setHoveredDate(date: Date | null): void` - Set hovered date
- `goToNextMonth(): void` - Navigate to next month
- `goToPreviousMonth(): void` - Navigate to previous month
- `goToToday(): void` - Navigate to current month
- `goToMonth(year: number, month: number): void` - Navigate to specific month
- `setIsOpen(isOpen: boolean): void` - Set open state
- `toggle(): void` - Toggle open state
- `setTime(hours: number, minutes: number, seconds?: number): void` - Set time for selected date
- `selectDateAndTime(date: Date, hours: number, minutes: number, seconds?: number): void` - Select date and time together

##### Helper Methods

- `isDateDisabled(date: Date): boolean` - Check if date is disabled
- `isDateSelected(date: Date): boolean` - Check if date is selected
- `isDateInRange(date: Date): boolean` - Check if date is in range
- `formatDate(date: Date, format?: string): string` - Format a date
- `parseDate(dateString: string, format?: string): Date | null` - Parse a date string

## Advanced Usage

### DateTime Selection with Time Constraints

```tsx
const datePicker = useDatePicker({
  mode: 'single',
  minDate: new Date(), // No past dates
  time: {
    enableTime: true,
    timeFormat: '12h',
    minuteStep: 15, // 15-minute intervals
    showSeconds: false,
  },
  disabledDaysOfWeek: [0, 6], // Disable weekends
});

// Enhanced Today button behavior
// When time is enabled, goToToday() sets current date AND time
datePicker.goToToday(); // Sets to right now!
```

### Custom Date Formatting

```tsx
const datePicker = useDatePicker({
  mode: 'single'
});

// Format dates in different ways
const formattedDate = datePicker.formatDate(datePicker.selectedDate, 'EEEE, MMMM do, yyyy');
// "Friday, January 15th, 2024"
```

### Controlled Components

```tsx
function ControlledDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const datePicker = useDatePicker({
    mode: 'single',
    selectedDate
  });
  
  useEffect(() => {
    setSelectedDate(datePicker.selectedDate);
  }, [datePicker.selectedDate]);
  
  return (
    // Your component JSX
  );
}
```

## Styling

The datepicker is completely headless, so you have full control over styling. Here are some CSS classes you might want to style:

```css
.calendar {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 8px;
}

.calendar-day {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.calendar-day:hover {
  background-color: #f0f0f0;
}

.calendar-day.selected {
  background-color: #007bff;
  color: white;
}

.calendar-day.today {
  font-weight: bold;
  color: #007bff;
}

.calendar-day.in-range {
  background-color: #e6f3ff;
  color: #007bff;
}

.calendar-day.range-endpoint {
  background-color: #007bff;
  color: white;
}

.calendar-day:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calendar-day.other-month {
  color: #ccc;
}
```

## Examples

This package includes complete example components:

```tsx
import { SimpleCalendar, RangePicker, MultiSelectCalendar } from '@billme-venture/headless-datepicker';

// Pre-built components with styling
function App() {
  return (
    <div>
      <SimpleCalendar onDateSelect={(date) => console.log(date)} />
      <RangePicker onRangeSelect={(range) => console.log(range)} />
      <MultiSelectCalendar onDatesSelect={(dates) => console.log(dates)} />
    </div>
  );
}
```

## TypeScript Support

The package is written in TypeScript and includes complete type definitions:

```typescript
import { DatePickerReturn, CalendarDay, DateRange } from '@billme-venture/headless-datepicker';

function MyComponent() {
  const datePicker: DatePickerReturn = useDatePicker();
  
  const handleDayClick = (day: CalendarDay) => {
    if (!day.isDisabled) {
      datePicker.selectDate(day.date);
    }
  };
  
  return (
    // Component JSX
  );
}
```

## Testing

The package includes comprehensive tests. Run them with:

```bash
npm test
```

## Troubleshooting

### "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" Error

This error typically occurs when there are multiple versions of React in your project or when React hooks are called outside a React component. Here are the solutions:

#### 1. **Check for Multiple React Versions**
```bash
npm ls react
```
If you see multiple versions, ensure only one version of React is installed:

```bash
npm dedupe
# or
npm install --legacy-peer-deps
```

#### 2. **Webpack Resolution (for Create React App or custom Webpack)**
Add this to your webpack config:
```javascript
module.exports = {
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
};
```

#### 3. **Vite Resolution**
Add this to your `vite.config.js`:
```javascript
export default defineConfig({
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
});
```

#### 4. **Next.js Resolution**
Add this to your `next.config.js`:
```javascript
module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };
    return config;
  },
};
```

#### 5. **Package Manager Issues**
Try deleting `node_modules` and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 6. **Ensure Proper Usage**
Make sure you're calling `useDatePicker` inside a React component:
```tsx
// ✅ Correct - inside React component
function MyComponent() {
  const datePicker = useDatePicker();
  return <div>...</div>;
}

// ❌ Incorrect - outside React component
const datePicker = useDatePicker(); // This will cause the error
```

### Other Common Issues

#### TypeScript Errors
If you encounter TypeScript errors, make sure you have the latest version of `@types/react`:
```bash
npm install --save-dev @types/react@latest @types/react-dom@latest
```

#### Server-Side Rendering (SSR) Issues
For Next.js or other SSR frameworks, make sure to check if you're in a browser environment:
```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;

// Now safe to use datePicker
const datePicker = useDatePicker();
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [billme team](https://github.com/billme-venture)