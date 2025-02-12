import { format, isBefore, addDays, isSameDay } from "date-fns";
import { useUpcomingContext } from "../context/UpcomingContext";
import { useTaskContext } from "../context/TaskContext";
import {useSidebarContext} from "../context/SidebarContext";

const WeekDays = () => {

  const { setSelectedDate, selectedDate, currentWeekStart } =
    useUpcomingContext();
  const { tasks} =
    useTaskContext();
  const { isWindowResized } = useSidebarContext();

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
          >
            <span
              style={{
                display: "flex",
                flexDirection: isWindowResized ? "column" : "row",
                cursor: "pointer",
                fontSize: "12px",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: isSelected ? "bold" : "normal",
                color: isSelected ? "black" : "rgb(75, 75, 75)",
                gap: "10px",
              }}
            >
              {isWindowResized ? format(day, "EEEEE") : format(day, "E")}
              <span
                style={{
                  backgroundColor: isSelected
                    ? "rgb(213, 59, 59)"
                    : "transparent",
                  color: isSelected ? "white" : "rgb(75, 75, 75)",
                  padding: isSelected ? "3.5px 5px" : "3px",
                  borderRadius: "50%",
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
