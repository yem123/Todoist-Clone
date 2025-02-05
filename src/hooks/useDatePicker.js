import { useState, useEffect } from "react";
import { format, isToday, isTomorrow, isYesterday, isThisWeek, isFuture } from "date-fns";

export const getFormattedDate = (date) => {
  if (!date) return "";

  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date, { weekStartsOn: 1 }) && isFuture(date)) return format(date, "EEEE");

  return format(date, "d MMM");
};

const useDatePicker = (initialDate = null) => {
  const [dateSelected, setDateSelected] = useState(
    initialDate ? new Date(initialDate) : null
  );
  const [displayDate, setDisplayDate] = useState("");

  useEffect(() => {
    if (dateSelected) {
      setDisplayDate(getFormattedDate(dateSelected));
    } else {
      setDisplayDate("");
    }

    const interval = setInterval(() => {
      if (dateSelected) {
        setDisplayDate(getFormattedDate(dateSelected));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dateSelected]);

  const resetDate = () => {
    setDateSelected(null);
    setDisplayDate("");
  };

  return { dateSelected, displayDate, setDateSelected, resetDate };
};

export default useDatePicker;
