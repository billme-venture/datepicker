import React, { useState } from 'react';
import { useDatePicker, SimpleCalendar, RangePicker, MultiSelectCalendar, TimePicker } from '@billme-venture/headless-datepicker';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '8px' }}>@billme-venture/headless-datepicker</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Headless React Datepicker Examples</p>
      </header>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Simple Calendar */}
        <div style={{ 
          border: '1px solid #e9ecef', 
          borderRadius: '12px', 
          padding: '24px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#495057' }}>Simple Calendar</h2>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            Selected: {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'None'}
          </p>
          <SimpleCalendar onDateSelect={setSelectedDate} />
        </div>

        {/* Range Picker */}
        <div style={{ 
          border: '1px solid #e9ecef', 
          borderRadius: '12px', 
          padding: '24px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#495057' }}>Range Picker</h2>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            Range: {selectedRange.start && selectedRange.end 
              ? `${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`
              : selectedRange.start 
                ? `${selectedRange.start.toLocaleDateString()} - (select end date)`
                : 'None'
            }
          </p>
          <RangePicker onRangeSelect={setSelectedRange} />
        </div>

        {/* Multi-select Calendar */}
        <div style={{ 
          border: '1px solid #e9ecef', 
          borderRadius: '12px', 
          padding: '24px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#495057' }}>Multi-select Calendar</h2>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            Selected {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''} (max 5)
          </p>
          {selectedDates.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '4px',
                maxHeight: '80px',
                overflowY: 'auto'
              }}>
                {selectedDates.map((date, index) => (
                  <span 
                    key={index}
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
            </div>
          )}
          <MultiSelectCalendar onDatesSelect={setSelectedDates} maxDates={5} />
        </div>

        {/* DateTime Picker */}
        <div style={{ 
          border: '1px solid #e9ecef', 
          borderRadius: '12px', 
          padding: '24px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#495057' }}>DateTime Picker</h2>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            Select both date and time with enhanced Today button
          </p>
          <DateTimePicker />
        </div>
      </div>

      {/* Custom implementation example */}
      <div style={{ 
        border: '1px solid #e9ecef', 
        borderRadius: '12px', 
        padding: '24px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: 0, color: '#495057' }}>Custom Implementation</h2>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Example with constraints: no past dates, no weekends, custom styling
        </p>
        <CustomDatePicker />
      </div>

      <footer style={{ 
        marginTop: '40px', 
        padding: '20px', 
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '14px'
      }}>
        <p>
          Built with ❤️ by the billme team • 
          <a 
            href="https://github.com/billme-venture/datepicker" 
            style={{ color: '#007bff', textDecoration: 'none', marginLeft: '8px' }}
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

function DateTimePicker() {
  const datePicker = useDatePicker({
    mode: 'single',
    time: {
      enableTime: true,
      timeFormat: '24h',
      minuteStep: 5,
      showSeconds: false,
    },
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#495057' }}>
        Selected: {datePicker.selectedDate 
          ? `${datePicker.formatDate(datePicker.selectedDate, 'EEEE, MMMM d, yyyy')} at ${datePicker.selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
          : 'None'
        }
      </p>
      
      <button
        onClick={datePicker.toggle}
        style={{
          padding: '12px 16px',
          border: '2px solid #28a745',
          borderRadius: '8px',
          backgroundColor: datePicker.isOpen ? '#28a745' : 'white',
          color: datePicker.isOpen ? 'white' : '#28a745',
          cursor: 'pointer',
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: '500',
          minWidth: '200px',
          transition: 'all 0.2s ease'
        }}
      >
        {datePicker.selectedDate 
          ? `${datePicker.formatDate(datePicker.selectedDate, 'MMM d, yyyy')} ${datePicker.selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
          : 'Select date & time'
        }
      </button>

      {datePicker.isOpen && (
        <div style={{ 
          border: '2px solid #e9ecef',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '20px',
          marginTop: '8px',
          width: 'fit-content'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px'
          }}>
            <button
              onClick={datePicker.goToPreviousMonth}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '20px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#6c757d'
              }}
            >
              ←
            </button>
            <h3 style={{ margin: 0, color: '#495057', fontSize: '18px', fontWeight: '600' }}>
              {monthNames[datePicker.currentMonth]} {datePicker.currentYear}
            </h3>
            <button
              onClick={datePicker.goToNextMonth}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '20px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#6c757d'
              }}
            >
              →
            </button>
          </div>

          {/* Day names */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '4px',
            marginBottom: '12px'
          }}>
            {dayNames.map(day => (
              <div 
                key={day} 
                style={{ 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#6c757d',
                  padding: '8px'
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
            gap: '4px',
            marginBottom: '20px'
          }}>
            {datePicker.calendar.weeks.map((week: any, weekIndex: number) =>
              week.days.map((day: any, dayIndex: number) => (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => datePicker.selectDate(day.date)}
                  disabled={day.isDisabled}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: day.isDisabled ? 'not-allowed' : 'pointer',
                    backgroundColor: day.isSelected 
                      ? '#28a745' 
                      : day.isToday 
                        ? '#d4edda' 
                        : 'transparent',
                    color: day.isSelected 
                      ? 'white' 
                      : day.isDisabled
                        ? '#dee2e6'
                        : day.isToday
                          ? '#155724'
                          : day.isCurrentMonth 
                            ? '#495057' 
                            : '#adb5bd',
                    opacity: day.isDisabled ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    fontWeight: day.isToday ? '600' : '400'
                  }}
                >
                  {day.date.getDate()}
                </button>
              ))
            )}
          </div>

          {/* Time Picker */}
          {datePicker.selectedDate && (
            <div style={{ marginBottom: '20px' }}>
              <TimePicker
                selectedDate={datePicker.selectedDate}
                timeFormat="24h"
                minuteStep={5}
                showSeconds={false}
                onTimeChange={(hours: number, minutes: number, seconds?: number) => {
                  datePicker.setTime(hours, minutes, seconds);
                }}
              />
            </div>
          )}

          {/* Footer */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #e9ecef'
          }}>
            <button
              onClick={datePicker.clearSelection}
              style={{
                padding: '8px 16px',
                border: '1px solid #dc3545',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#dc3545',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              Clear
            </button>
            <button
              onClick={datePicker.goToToday}
              style={{
                padding: '8px 16px',
                border: '1px solid #28a745',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#28a745',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              Now
            </button>
          </div>
        </div>
      )}
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
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#495057' }}>
        Selected: {datePicker.selectedDate 
          ? datePicker.formatDate(datePicker.selectedDate, 'EEEE, MMMM d, yyyy') 
          : 'None'
        }
      </p>
      
      <button
        onClick={datePicker.toggle}
        style={{
          padding: '12px 16px',
          border: '2px solid #007bff',
          borderRadius: '8px',
          backgroundColor: datePicker.isOpen ? '#007bff' : 'white',
          color: datePicker.isOpen ? 'white' : '#007bff',
          cursor: 'pointer',
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: '500',
          minWidth: '200px',
          transition: 'all 0.2s ease'
        }}
      >
        {datePicker.selectedDate 
          ? datePicker.formatDate(datePicker.selectedDate, 'MMM d, yyyy')
          : 'Select a date'
        }
      </button>

      {datePicker.isOpen && (
        <div style={{ 
          border: '2px solid #e9ecef',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '20px',
          marginTop: '8px',
          width: 'fit-content'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px'
          }}>
            <button
              onClick={datePicker.goToPreviousMonth}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '20px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#6c757d'
              }}
            >
              ←
            </button>
            <h3 style={{ margin: 0, color: '#495057', fontSize: '18px', fontWeight: '600' }}>
              {monthNames[datePicker.currentMonth]} {datePicker.currentYear}
            </h3>
            <button
              onClick={datePicker.goToNextMonth}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '20px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#6c757d'
              }}
            >
              →
            </button>
          </div>

          {/* Day names */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '4px',
            marginBottom: '12px'
          }}>
            {dayNames.map(day => (
              <div 
                key={day} 
                style={{ 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#6c757d',
                  padding: '8px'
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
            gap: '4px',
            marginBottom: '20px'
          }}>
            {datePicker.calendar.weeks.map((week: any, weekIndex: number) =>
              week.days.map((day: any, dayIndex: number) => (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => datePicker.selectDate(day.date)}
                  disabled={day.isDisabled}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: day.isDisabled ? 'not-allowed' : 'pointer',
                    backgroundColor: day.isSelected 
                      ? '#007bff' 
                      : day.isToday 
                        ? '#e3f2fd' 
                        : 'transparent',
                    color: day.isSelected 
                      ? 'white' 
                      : day.isDisabled
                        ? '#dee2e6'
                        : day.isToday
                          ? '#1976d2'
                          : day.isCurrentMonth 
                            ? '#495057' 
                            : '#adb5bd',
                    opacity: day.isDisabled ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    fontWeight: day.isToday ? '600' : '400'
                  }}
                  onMouseEnter={(e) => {
                    if (!day.isDisabled) {
                      e.currentTarget.style.backgroundColor = day.isSelected ? '#0056b3' : '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!day.isDisabled) {
                      e.currentTarget.style.backgroundColor = day.isSelected 
                        ? '#007bff' 
                        : day.isToday 
                          ? '#e3f2fd' 
                          : 'transparent';
                    }
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
            paddingTop: '16px',
            borderTop: '1px solid #e9ecef'
          }}>
            <button
              onClick={datePicker.clearSelection}
              style={{
                padding: '8px 16px',
                border: '1px solid #dc3545',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#dc3545',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              Clear
            </button>
            <button
              onClick={datePicker.goToToday}
              style={{
                padding: '8px 16px',
                border: '1px solid #28a745',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#28a745',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
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

export default App;
