import { useState, useEffect } from "react";
import { format, startOfDay } from "date-fns";

const useDatePicker = (initialDate = null) => {
  const [dateSelected, setDateSelected] = useState(
    initialDate ? new Date(initialDate) : null
  );
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (dateSelected) {
      const today = startOfDay(new Date());
      const yesterday = startOfDay(
        new Date(today.getTime() - 24 * 60 * 60 * 1000)
      );
      const tomorrow = startOfDay(
        new Date(today.getTime() + 24 * 60 * 60 * 1000)
      );
      const selectedDate = startOfDay(new Date(dateSelected));

      if (selectedDate.getTime() === today.getTime()) {
        setDisplayText("Today");
      } else if (selectedDate.getTime() === yesterday.getTime()) {
        setDisplayText("Yesterday");
      } else if (selectedDate.getTime() === tomorrow.getTime()) {
        setDisplayText("Tomorrow");
      } else {
        setDisplayText(format(selectedDate, "dd MMM"));
      }
    } else {
      setDisplayText("");
    }
  }, [dateSelected]);

  const resetDate = () => {
    setDateSelected(null);
    setDisplayText("");
  };

  return { dateSelected, displayText, setDateSelected, resetDate };
};

export default useDatePicker;
