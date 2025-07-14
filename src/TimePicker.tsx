import React from 'react';
import { formatTime, generateHourOptions, generateMinuteOptions } from './utils';

interface TimePickerProps {
  selectedDate: Date | null;
  timeFormat?: '12h' | '24h';
  minuteStep?: number;
  showSeconds?: boolean;
  onTimeChange: (hours: number, minutes: number, seconds?: number) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedDate,
  timeFormat = '24h',
  minuteStep = 1,
  showSeconds = false,
  onTimeChange,
}) => {
  const currentTime = selectedDate || new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  const hourOptions = generateHourOptions(timeFormat);
  const minuteOptions = generateMinuteOptions(minuteStep);
  const secondOptions = Array.from({ length: 60 }, (_, i) => i);

  const displayHours = timeFormat === '12h' 
    ? (currentHours === 0 ? 12 : currentHours > 12 ? currentHours - 12 : currentHours)
    : currentHours;

  const isPM = currentHours >= 12;

  const handleHourChange = (hour: number) => {
    let finalHour = hour;
    if (timeFormat === '12h') {
      if (hour === 12) {
        finalHour = isPM ? 12 : 0;
      } else {
        finalHour = isPM ? hour + 12 : hour;
      }
    }
    onTimeChange(finalHour, currentMinutes, showSeconds ? currentSeconds : 0);
  };

  const handleMinuteChange = (minute: number) => {
    onTimeChange(currentHours, minute, showSeconds ? currentSeconds : 0);
  };

  const handleSecondChange = (second: number) => {
    onTimeChange(currentHours, currentMinutes, second);
  };

  const togglePeriod = () => {
    const newHour = isPM ? currentHours - 12 : currentHours + 12;
    onTimeChange(newHour, currentMinutes, showSeconds ? currentSeconds : 0);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '6px',
      fontSize: '14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <label style={{ fontSize: '12px', color: '#6c757d', minWidth: '40px' }}>Hour:</label>
        <select
          value={displayHours}
          onChange={(e) => handleHourChange(parseInt(e.target.value))}
          style={{
            padding: '4px 8px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px',
            width: '60px'
          }}
        >
          {hourOptions.map(hour => (
            <option key={hour} value={hour}>
              {hour.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>

      <span style={{ color: '#6c757d', fontWeight: 'bold' }}>:</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <label style={{ fontSize: '12px', color: '#6c757d', minWidth: '40px' }}>Min:</label>
        <select
          value={currentMinutes}
          onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
          style={{
            padding: '4px 8px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px',
            width: '60px'
          }}
        >
          {minuteOptions.map(minute => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>

      {showSeconds && (
        <>
          <span style={{ color: '#6c757d', fontWeight: 'bold' }}>:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '12px', color: '#6c757d', minWidth: '40px' }}>Sec:</label>
            <select
              value={currentSeconds}
              onChange={(e) => handleSecondChange(parseInt(e.target.value))}
              style={{
                padding: '4px 8px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px',
                width: '60px'
              }}
            >
              {secondOptions.map(second => (
                <option key={second} value={second}>
                  {second.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {timeFormat === '12h' && (
        <button
          onClick={togglePeriod}
          style={{
            padding: '4px 8px',
            border: '1px solid #007bff',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: '#007bff',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            minWidth: '40px'
          }}
        >
          {isPM ? 'PM' : 'AM'}
        </button>
      )}

      <div style={{
        marginLeft: '8px',
        padding: '4px 8px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#1976d2',
        fontWeight: '500'
      }}>
        {formatTime(currentTime, timeFormat, showSeconds)}
      </div>
    </div>
  );
};
