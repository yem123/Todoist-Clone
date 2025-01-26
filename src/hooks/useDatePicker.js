import { useState, useEffect } from "react";
import { format } from "date-fns";

const useDatePicker = (initialDate = null) => {
  const [dateSelected, setDateSelected] = useState(initialDate);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (dateSelected) {
      const today = new Date();
      const yesterday = new Date(today);
      const tomorrow = new Date(today);

      yesterday.setDate(today.getDate() - 1);
      tomorrow.setDate(today.getDate() + 1);

      const formatDate = (d) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());

      const formattedDate = formatDate(dateSelected);
      const formattedToday = formatDate(today);
      const formattedYesterday = formatDate(yesterday);
      const formattedTomorrow = formatDate(tomorrow);

      if (formattedDate.getTime() === formattedToday.getTime()) {
        setDisplayText("Today");
      } else if (formattedDate.getTime() === formattedYesterday.getTime()) {
        setDisplayText("Yesterday");
      } else if (formattedDate.getTime() === formattedTomorrow.getTime()) {
        setDisplayText("Tomorrow");
      } else {
        setDisplayText(format(dateSelected, "dd MMM"));
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