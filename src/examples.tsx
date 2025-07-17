import React from "react";
import { useDatePicker } from "./useDatePicker";

// Simple Calendar Component Example
export const SimpleCalendar: React.FC<{
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}> = ({ onDateSelect, minDate, maxDate }) => {
  const datePicker = useDatePicker({
    mode: "single",
    minDate,
    maxDate,
  });

  const handleDateClick = (date: Date) => {
    datePicker.selectDate(date);
    onDateSelect?.(date);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className="calendar"
      style={{ fontFamily: "Arial, sans-serif", width: "280px" }}
    >
      {/* Header */}
      <div
        className="calendar-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <button
          onClick={datePicker.goToPreviousMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <h3 style={{ margin: 0 }}>
          {monthNames[datePicker.currentMonth]} {datePicker.currentYear}
        </h3>
        <button
          onClick={datePicker.goToNextMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      {/* Day names */}
      <div
        className="calendar-day-names"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "8px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {dayNames.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
              padding: "4px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "8px",
        }}
      >
        {datePicker.calendar.weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <button
              key={`${weekIndex}-${dayIndex}`}
              onClick={() => handleDateClick(day.date)}
              disabled={day.isDisabled}
              style={{
                width: "32px",
                height: "32px",
                margin: "1px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: day.isDisabled ? "not-allowed" : "pointer",
                backgroundColor: day.isSelected
                  ? "#007bff"
                  : day.isToday
                  ? "#f0f0f0"
                  : "transparent",
                color: day.isSelected
                  ? "white"
                  : day.isCurrentMonth
                  ? "#333"
                  : "#ccc",
                opacity: day.isDisabled ? 0.5 : 1,
              }}
            >
              {day.date.getDate()}
            </button>
          ))
        )}
      </div>

      {/* Today button */}
      <div style={{ padding: "16px", textAlign: "center" }}>
        <button
          onClick={() => {
            handleDateClick(new Date());
          }}
          style={{
            padding: "8px 16px",
            border: "1px solid #007bff",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "#007bff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
};

// Range Picker Component Example
export const RangePicker: React.FC<{
  onRangeSelect?: (range: { start: Date | null; end: Date | null }) => void;
}> = ({ onRangeSelect }) => {
  const datePicker = useDatePicker({
    mode: "range",
  });

  React.useEffect(() => {
    onRangeSelect?.(datePicker.selectedRange);
  }, [datePicker.selectedRange, onRangeSelect]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className="range-picker"
      style={{ fontFamily: "Arial, sans-serif", width: "280px" }}
    >
      {/* Header */}
      <div
        className="calendar-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <button
          onClick={datePicker.goToPreviousMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <h3 style={{ margin: 0 }}>
          {monthNames[datePicker.currentMonth]} {datePicker.currentYear}
        </h3>
        <button
          onClick={datePicker.goToNextMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      {/* Selected range display */}
      <div
        style={{
          padding: "8px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}
      >
        {datePicker.selectedRange.start && datePicker.selectedRange.end
          ? `${datePicker.formatDate(
              datePicker.selectedRange.start,
              "MMM d"
            )} - ${datePicker.formatDate(
              datePicker.selectedRange.end,
              "MMM d, yyyy"
            )}`
          : datePicker.selectedRange.start
          ? `${datePicker.formatDate(
              datePicker.selectedRange.start,
              "MMM d, yyyy"
            )} - Select end date`
          : "Select start date"}
      </div>

      {/* Day names */}
      <div
        className="calendar-day-names"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "8px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {dayNames.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
              padding: "4px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "8px",
        }}
      >
        {datePicker.calendar.weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <button
              key={`${weekIndex}-${dayIndex}`}
              onClick={() => datePicker.selectDate(day.date)}
              onMouseEnter={() => datePicker.setHoveredDate(day.date)}
              onMouseLeave={() => datePicker.setHoveredDate(null)}
              disabled={day.isDisabled}
              style={{
                width: "32px",
                height: "32px",
                margin: "1px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: day.isDisabled ? "not-allowed" : "pointer",
                backgroundColor:
                  day.isRangeStart || day.isRangeEnd
                    ? "#007bff"
                    : day.isInRange
                    ? "#e6f3ff"
                    : day.isToday
                    ? "#f0f0f0"
                    : "transparent",
                color:
                  day.isRangeStart || day.isRangeEnd
                    ? "white"
                    : day.isInRange
                    ? "#007bff"
                    : day.isCurrentMonth
                    ? "#333"
                    : "#ccc",
                opacity: day.isDisabled ? 0.5 : 1,
              }}
            >
              {day.date.getDate()}
            </button>
          ))
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={datePicker.clearSelection}
          style={{
            padding: "8px 16px",
            border: "1px solid #dc3545",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "#dc3545",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Clear
        </button>
        <button
          onClick={datePicker.goToToday}
          style={{
            padding: "8px 16px",
            border: "1px solid #007bff",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "#007bff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
};

// Multi-select Calendar Component Example
export const MultiSelectCalendar: React.FC<{
  onDatesSelect?: (dates: Date[]) => void;
  maxDates?: number;
}> = ({ onDatesSelect, maxDates }) => {
  const datePicker = useDatePicker({
    mode: "multiple",
  });

  React.useEffect(() => {
    onDatesSelect?.(datePicker.selectedDates);
  }, [datePicker.selectedDates, onDatesSelect]);

  const handleDateClick = (date: Date) => {
    if (
      maxDates &&
      datePicker.selectedDates.length >= maxDates &&
      !datePicker.isDateSelected(date)
    ) {
      return; // Don't add more dates if limit reached
    }
    datePicker.selectDate(date);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className="multi-select-calendar"
      style={{ fontFamily: "Arial, sans-serif", width: "280px" }}
    >
      {/* Header */}
      <div
        className="calendar-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <button
          onClick={datePicker.goToPreviousMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <h3 style={{ margin: 0 }}>
          {monthNames[datePicker.currentMonth]} {datePicker.currentYear}
        </h3>
        <button
          onClick={datePicker.goToNextMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      {/* Selected count */}
      <div
        style={{
          padding: "8px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}
      >
        {datePicker.selectedDates.length} date
        {datePicker.selectedDates.length !== 1 ? "s" : ""} selected
        {maxDates && ` (max ${maxDates})`}
      </div>

      {/* Day names */}
      <div
        className="calendar-day-names"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "8px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {dayNames.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
              padding: "4px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "8px",
        }}
      >
        {datePicker.calendar.weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => {
            const isLimitReached = !!(
              maxDates &&
              datePicker.selectedDates.length >= maxDates &&
              !day.isSelected
            );
            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => handleDateClick(day.date)}
                disabled={day.isDisabled || isLimitReached}
                type="button"
                style={{
                  width: "32px",
                  height: "32px",
                  margin: "1px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor:
                    day.isDisabled || isLimitReached
                      ? "not-allowed"
                      : "pointer",
                  backgroundColor: day.isSelected
                    ? "#007bff"
                    : day.isToday
                    ? "#f0f0f0"
                    : "transparent",
                  color: day.isSelected
                    ? "white"
                    : day.isCurrentMonth
                    ? "#333"
                    : "#ccc",
                  opacity: day.isDisabled || isLimitReached ? 0.5 : 1,
                }}
              >
                {day.date.getDate()}
              </button>
            );
          })
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={datePicker.clearSelection}
          style={{
            padding: "8px 16px",
            border: "1px solid #dc3545",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "#dc3545",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Clear All
        </button>
        <button
          onClick={datePicker.goToToday}
          style={{
            padding: "8px 16px",
            border: "1px solid #007bff",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "#007bff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
};
