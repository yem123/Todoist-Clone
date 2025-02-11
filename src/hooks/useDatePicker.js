import { useState, useEffect } from "react";
import { format, isToday, isTomorrow, isYesterday, isThisWeek, isFuture} from "date-fns";

export const getFormattedDate = (date) => {
  if (!date) return "";

  if (isYesterday(date)) return format(date, "'Yesterday'");
  if (isToday(date)) return format(date, "'Today'");
  if (isTomorrow(date)) return format(date, "'Tomorrow'");

  if (isThisWeek(date, { weekStartsOn: 1 }) && isFuture(date))
     return format(date, "EEEE");

  return format(date, "d MMM");
};

const useDatePicker = (initialDate = null) => {
  const [dateSelected, setDateSelected] = useState(
    initialDate ? new Date(initialDate) : new Date()
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
