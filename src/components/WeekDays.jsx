import { format, isBefore, addDays, isSameDay } from "date-fns";
import { useUpcomingContext } from "../context/UpcomingContext";
import { useTaskContext } from "../context/TaskContext";

const WeekDays = () => {

  const { setSelectedDate, selectedDate, currentWeekStart } =
    useUpcomingContext();
  const { tasks} =
    useTaskContext();

    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
      addDays(currentWeekStart, i)
    );

  const taskCounts = tasks.reduce((acc, task) => {
    const taskDate = format(new Date(task.dateSelected), "yyyy-MM-dd");
    acc[taskDate] = (acc[taskDate] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {daysOfWeek.map((day) => {
        const dayKey = format(day, "yyyy-MM-dd");
        const isDisabled = isBefore(day, new Date());
        const isSelected =
          selectedDate && isSameDay(selectedDate, new Date(day));
        return (
          <div
            key={day}
            className={`upcoming-days ${isDisabled ? "day-disabled" : ""}`}
            onClick={() => !isDisabled && setSelectedDate(day)}
            style={{
              display: "flex",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: isSelected ? "bold" : "normal",
              color: isSelected ? "black" : "rgb(75, 75, 75)",
            }}
          >
            <span>
              {format(day, "E")}
              <span
                style={{
                  backgroundColor: isSelected
                    ? "rgb(213, 59, 59)"
                    : "transparent",
                  color: isSelected ? "white" : "rgb(75, 75, 75)",
                  padding: isSelected ? "3.5px 10px" : "3px",
                  alignSelf: "center",
                  justifySelf: "center",
                  borderRadius: "5px",
                  marginLeft: isSelected ? "2px" : 0,
                }}
              >
                {format(day, "d")}
              </span>
            </span>
            {taskCounts[dayKey] > 0 && !isDisabled && (
              <span className="upcoming-number-of-tasks">
                {taskCounts[dayKey]}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default WeekDays;
