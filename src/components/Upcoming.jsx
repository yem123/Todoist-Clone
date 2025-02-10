import Add from "./Add";
import Editor from "./Editor";
import { UpcomingTasks } from "./TaskFilters";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/upcoming.css";
import "../styles/customDate.css";
import WeekDays from "./WeekDays";
import WeeksNavigator from "./WeeksNavigator";
import UpcomingDateSelector from "./UpcomingDateSelector";
import { useTaskContext } from "../context/TaskContext";
import { format, isTomorrow, isFuture } from "date-fns";
import { useUpcomingContext } from "../context/UpComingContext";

const Upcoming = () => {
  const { isEditorOpen, clickId, isSticky } = useTaskContext();
  const { selectedDate } = useUpcomingContext();
  
  const upcomingFormatted = isTomorrow(selectedDate)
    ? format(selectedDate, "d MMM ‧ 'Tomorrow' ‧ EEEE")
    : isFuture(selectedDate)
    ? format(selectedDate, "d MMM ‧ EEEE")
    : "";

  return (
    <>
      <header
        className="upcoming-sticky-box"
        style={{
          borderBottom: isSticky ? "1px solid #58585814" : "",
        }}
      >
        <div
          className="upcoming-sticky-header"
          style={{
            opacity: isSticky ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <div className="title">Upcoming</div>
          <div className="date-section">
            <UpcomingDateSelector />
            <div className="upcoming-date-navigator">
              <WeeksNavigator />
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
            <UpcomingDateSelector />
            <div className="upcoming-date-navigator">
              <WeeksNavigator />
            </div>
          </div>
        </div>
        <div
          className="upcoming-days-of-week"
          style={{
            padding: isSticky ? "30px 0 10px 0" : "10px",
          }}
        >
          <WeekDays />
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

export default Upcoming;
