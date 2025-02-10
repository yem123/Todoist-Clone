import {
  addDays,
  startOfWeek,
  getWeek,
  subWeeks,
  addWeeks,
  isBefore,
} from "date-fns";
import { useUpcomingContext } from "../context/UpcomingContext";

const WeeksNavigator = () => {

  const {
    setSelectedDate,
    setCurrentWeekNumber,
    currentWeekNumber,
    setCurrentWeekStart,
    currentWeekStart,
  } = useUpcomingContext();
  const isPrevDisabled = isBefore(currentWeekStart, addDays(new Date(), 1));

  const prevWeek = () => {
    const newWeekStart = startOfWeek(subWeeks(currentWeekStart, 1), {
      weekStartsOn: 1,
    });

    setCurrentWeekStart(newWeekStart);
    setCurrentWeekNumber(getWeek(newWeekStart));

    if (isBefore(newWeekStart, addDays(new Date(), 1))) {
      setSelectedDate(addDays(new Date(), 1));
    } else {
      setSelectedDate(newWeekStart);
    }
  };

  const nextWeek = () => {
    const newWeekStart = startOfWeek(addWeeks(currentWeekStart, 1), {
      weekStartsOn: 1,
    });
    setCurrentWeekStart(newWeekStart);
    setCurrentWeekNumber(getWeek(newWeekStart));
    setSelectedDate(newWeekStart);
  };

  return (
    <>
      <span
        className={`material-icons-outlined ${
          isPrevDisabled ? "day-disabled" : ""
        }`}
        onClick={!isPrevDisabled ? prevWeek : undefined}
        style={{
          cursor: isPrevDisabled ? "none" : "pointer",
        }}
      >
        keyboard_arrow_left
      </span>
      <span className="week-number">week {currentWeekNumber}</span>
      <span
        className="material-icons-outlined"
        onClick={nextWeek}
        style={{
          cursor: "pointer",
        }}
      >
        keyboard_arrow_right
      </span>
    </>
  );
};

export default WeeksNavigator;
