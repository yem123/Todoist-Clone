import { createContext, useContext, useState, useEffect } from "react";
import { addDays, startOfWeek, getWeek } from "date-fns";

const UpcomingContext = createContext();

export const UpcomingProvider = ({ children }) => {

    const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getWeek(addDays(new Date(), 1))
  );
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(addDays(new Date(), 1), { weekStartsOn: 1 })
  );

  useEffect(() => {
    const updateDate = () => {
      setSelectedDate(addDays(new Date(), 1));
    };

    const nowTime = new Date();
    const millisTillMidnight =
      new Date(
        nowTime.getFullYear(),
        nowTime.getMonth(),
        nowTime.getDate() + 1,
        0,
        0,
        0
      ) - nowTime;

    const timeout = setTimeout(() => {
      updateDate();
      setInterval(updateDate, 24 * 60 * 60 * 1000);
    }, millisTillMidnight);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <UpcomingContext.Provider
      value={{
        currentWeekNumber,
        setCurrentWeekNumber,
        currentWeekStart,
        setCurrentWeekStart,
        setSelectedDate,
        selectedDate,
        isPickerOpen,
        setIsPickerOpen,
      }}
    >
      {children}
    </UpcomingContext.Provider>
  );
};

export const useUpcomingContext = () => {
  return useContext(UpcomingContext);
};
export default UpcomingContext;
