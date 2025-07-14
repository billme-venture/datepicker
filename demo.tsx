import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useDatePicker, SimpleCalendar, RangePicker, MultiSelectCalendar } from './src/index';

function Demo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1>@billme/datepicker Demo</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {/* Simple Calendar */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <h2>Simple Calendar</h2>
          <p>Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}</p>
          <SimpleCalendar onDateSelect={setSelectedDate} />
        </div>

        {/* Range Picker */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <h2>Range Picker</h2>
          <p>
            Range: {selectedRange.start && selectedRange.end 
              ? `${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`
              : 'None'
            }
          </p>
          <RangePicker onRangeSelect={setSelectedRange} />
        </div>

        {/* Multi-select Calendar */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <h2>Multi-select Calendar</h2>
          <p>Selected {selectedDates.length} dates</p>
          {selectedDates.length > 0 && (
            <ul style={{ fontSize: '12px', color: '#666' }}>
              {selectedDates.map((date, index) => (
                <li key={index}>{date.toLocaleDateString()}</li>
              ))}
            </ul>
          )}
          <MultiSelectCalendar onDatesSelect={setSelectedDates} maxDates={5} />
        </div>
      </div>

      {/* Custom implementation example */}
      <div style={{ 
        marginTop: '40px',
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: 'white'
      }}>
        <h2>Custom Implementation</h2>
        <CustomDatePicker />
      </div>
    </div>
  );
}

function CustomDatePicker() {
  const datePicker = useDatePicker({
    mode: 'single',
    minDate: new Date(), // No past dates
    disabledDaysOfWeek: [0, 6], // No weekends
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <p>Custom datepicker with constraints: No past dates, no weekends</p>
      <p>Selected: {datePicker.selectedDate ? datePicker.formatDate(datePicker.selectedDate, 'EEEE, MMMM d, yyyy') : 'None'}</p>
      
      <button
        onClick={datePicker.toggle}
        style={{
          padding: '8px 16px',
          border: '1px solid #007bff',
          borderRadius: '4px',
          backgroundColor: datePicker.isOpen ? '#007bff' : 'white',
          color: datePicker.isOpen ? 'white' : '#007bff',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        {datePicker.selectedDate 
          ? datePicker.formatDate(datePicker.selectedDate, 'MMM d, yyyy')
          : 'Select a date'
        }
      </button>

      {datePicker.isOpen && (
        <div style={{ 
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          marginTop: '8px'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '16px'
          }}>
            <button
              onClick={datePicker.goToPreviousMonth}
              style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
            >
              ←
            </button>
            <h3 style={{ margin: 0 }}>
              {monthNames[datePicker.currentMonth]} {datePicker.currentYear}
            </h3>
            <button
              onClick={datePicker.goToNextMonth}
              style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
            >
              →
            </button>
          </div>

          {/* Day names */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '4px',
            marginBottom: '8px'
          }}>
            {dayNames.map(day => (
              <div 
                key={day} 
                style={{ 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  color: '#666',
                  padding: '4px'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '2px'
          }}>
            {datePicker.calendar.weeks.map((week, weekIndex) =>
              week.days.map((day, dayIndex) => (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => datePicker.selectDate(day.date)}
                  disabled={day.isDisabled}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: day.isDisabled ? 'not-allowed' : 'pointer',
                    backgroundColor: day.isSelected 
                      ? '#007bff' 
                      : day.isToday 
                        ? '#f0f8ff' 
                        : 'transparent',
                    color: day.isSelected 
                      ? 'white' 
                      : day.isDisabled
                        ? '#ccc'
                        : day.isCurrentMonth 
                          ? '#333' 
                          : '#999',
                    opacity: day.isDisabled ? 0.5 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  {day.date.getDate()}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <button
              onClick={datePicker.clearSelection}
              style={{
                padding: '6px 12px',
                border: '1px solid #dc3545',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: '#dc3545',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Clear
            </button>
            <button
              onClick={datePicker.goToToday}
              style={{
                padding: '6px 12px',
                border: '1px solid #007bff',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// For development/demo purposes
if (typeof window !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<Demo />);
  }
}

export default Demo;
