import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isPast, isToday, isFuture } from "date-fns";
import useClickOutside from "../hooks/useClickOutside";
import "../styles/customDate.css";

function DateSelector({ dateSelected, setDateSelected, displayDate }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const dateButtonRef = useRef(null);
  const datePickerRef = useRef(null);

  useClickOutside([dateButtonRef, datePickerRef], () => setIsPickerOpen(false));

  const handleDateChange = (date) => {
    setDateSelected(date);
    setIsPickerOpen(false);
  };

  return (
    <>
      <div
        className="date-selector"
        ref={dateButtonRef}
        onClick={() => setIsPickerOpen((prev) => !prev)}
        style={{
          color: !dateSelected
            ? ""
            : isToday(new Date(dateSelected))
            ? "green"
            : isPast(new Date(dateSelected)) && !isToday(new Date(dateSelected))
            ? "#a23923"
            : isFuture(new Date(dateSelected))
            ? "rgb(70, 105, 171)"
            : null,
        }}
      >
        <span className="material-icons-outlined" style={{ fontSize: "12px" }}>
          event
        </span>
        {!dateSelected ? (
          <span style={{ fontSize: "10px" }}>Date</span>
        ) : (
          <span className="selected-date">{displayDate}</span>
        )}
      </div>
      {isPickerOpen && (
        <div className="react-date-picker" ref={datePickerRef}>
          <DatePicker
            selected={dateSelected}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </>
  );
}

export default DateSelector;
