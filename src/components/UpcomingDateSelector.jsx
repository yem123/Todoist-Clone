import { useRef } from "react";
import DatePicker from "react-datepicker";
import useClickOutside from "../hooks/useClickOutside";
import { useUpcomingContext } from "../context/UpcomingContext";
import { format, addDays, startOfWeek, getWeek } from "date-fns";

const UpcomingDateSelector = () => {
  const dateButtonRef = useRef(null);
  const datePickerRef = useRef(null);

  const {
    setCurrentWeekNumber,
    setCurrentWeekStart,
    setSelectedDate,
    isPickerOpen,
    setIsPickerOpen,
    selectedDate,
  } = useUpcomingContext();

  useClickOutside([dateButtonRef, datePickerRef], () => setIsPickerOpen(false));
  const monthFormatted = format(new Date(selectedDate), "MMMM");
  const yearFormatted = format(new Date(selectedDate), "yyyy");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsPickerOpen(false);
    setCurrentWeekStart(startOfWeek(date, { weekStartsOn: 1 }));
    setCurrentWeekNumber(getWeek(date));
  };

  return (
    <>
      <div
        className="upcoming-date-selector"
        ref={dateButtonRef}
        onClick={() => setIsPickerOpen((prev) => !prev)}
      >
        <span>
          <span className="upcoming-month">{monthFormatted}</span> {yearFormatted}
        </span>
        <span className="material-icons-outlined">keyboard_arrow_down</span>
      </div>
      {isPickerOpen && (
        <div className="react-date-picker" onClick={(e) => e.stopPropagation()}>
          <DatePicker
            ref={datePickerRef}
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={addDays(new Date(), 1)}
            inline
          />
        </div>
      )}
    </>
  );
};

export default UpcomingDateSelector;
