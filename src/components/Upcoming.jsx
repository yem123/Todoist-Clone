import { useState, useRef } from "react";
import { useTaskContext } from "../context/TaskContext";
import Add from "./Add";
import Editor from "./Editor";
import { UpcomingTasks } from "./TaskFilters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useClickOutside from "../hooks/useClickOutside";
import "../styles/upcoming.css";
import "../styles/customDate.css";
import {
  format,
  addDays,
  startOfWeek,
  getWeek,
  subWeeks,
  addWeeks,
  isTomorrow,
  isFuture,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns";

const Today = ({ isSticky }) => {
  const { tasks, isEditorOpen, clickId } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getWeek(new Date())
  );

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
    const dateButtonRef = useRef(null);
    const datePickerRef = useRef(null);

  useClickOutside([dateButtonRef, datePickerRef], () => setIsPickerOpen(false));

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const prevWeek = () => {
    const newWeekStart = startOfWeek(subWeeks(currentWeekStart, 1), {
      weekStartsOn: 1,
    });

    setCurrentWeekStart(newWeekStart);
    setCurrentWeekNumber(getWeek(newWeekStart));

    if (isBefore(newWeekStart, startOfDay(addDays(new Date(), 1)))) {
      setSelectedDate(startOfDay(addDays(new Date(), 1)));
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
    
  const isPrevDisabled = isBefore(addDays(currentWeekStart, 1), new Date());
    const monthFormatted = format(new Date(selectedDate), "MMMM");
  const yearFormatted = format(new Date(selectedDate), "yyyy");
  
  const taskCounts = tasks.reduce((acc, task) => {
    const taskDate = format(new Date(task.dateSelected), "yyyy-MM-dd");
    acc[taskDate] = (acc[taskDate] || 0) + 1;
    return acc;
  }, {});

  const upcomingFormatted = isTomorrow(selectedDate)
    ? format(selectedDate, "d MMM ‧ 'Tomorrow' ‧ EEEE")
    : isFuture(selectedDate)
    ? format(selectedDate, "d MMM ‧ EEEE")
      : "";
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsPickerOpen(false);
    setCurrentWeekStart(startOfWeek(date, { weekStartsOn: 1 }));
    setCurrentWeekNumber(getWeek(date));
  };
    

  return (
    <>
      <header
        className="upcoming-sticky-box"
        style={{
          borderBottom: isSticky ? "1px solid #58585814" : "",
        }}
      >
        <div className="upcoming-sticky-header"
          style={{
            opacity: isSticky ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <div className="title">Upcoming</div>
          <div className="date-section">
            <div className="date-selector">
              <span>
                {monthFormatted} {yearFormatted}
              </span>
              <span className="material-icons-outlined">
                keyboard_arrow_down
              </span>
            </div>
            <div className="date-navigator">
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
            </div>
          </div>
        </div>
      </header>
      <div className="upcoming-contents">
        <div
          className="upcoming-header"
          style={{
            opacity: isSticky ? 0 : 1,
            transition: "all 0.1s ease-in-out",
          }}
        >
          <h1 className="upcoming-title">Upcoming</h1>
          <div className="upcoming-date-section">
            <div
              className="upcoming-date-selector"
              ref={dateButtonRef}
              onClick={() => setIsPickerOpen((prev) => !prev)}
            >
              <span>
                <b>{monthFormatted}</b> {yearFormatted}
              </span>
              <span className="material-icons-outlined">
                keyboard_arrow_down
              </span>
            </div>
            <div className="upcoming-date-navigator">
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
            </div>
          </div>
          {isPickerOpen && (
            <div className="react-date-picker" ref={datePickerRef}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={addDays(new Date(), 1)}
                inline
              />
            </div>
          )}
        </div>
        <div
          className="upcoming-days-of-week"
          style={{
            padding: isSticky ? "30px 0 10px 0" : "10px",
          }}
        >
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
        </div>
        <span className="upcoming-tasks-date">{upcomingFormatted}</span>
        <section>
          <UpcomingTasks selectedDate={selectedDate} />
        </section>

        {isEditorOpen && !clickId && (
          <section className="upcoming-editor-section">
            <Editor />
          </section>
        )}

        {!isEditorOpen && !clickId && (
          <section className="upcoming-add-task-section">
            <Add />
          </section>
        )}
      </div>
    </>
  );
};

export default Today;
