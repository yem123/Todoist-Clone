import { useTaskContext } from "../context/TaskContext";
import { useSidebarContext } from "../context/SidebarContext";
import Add from "./Add";
import Overdue from "./Overdue";
import Editor from "./Editor";
import { TodayTasks } from "./TaskFilters";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";
import { format, isPast, isToday } from "date-fns";

const Today = ({isSticky}) => {
  const { isWindowResized } = useSidebarContext();
  const { tasks, isEditorOpen, clickId } = useTaskContext();


  const todayTasks = tasks.filter((task) =>
    isToday(new Date(task.dateSelected))
  );
  const todayFormatted = format(new Date(), "d MMM ‧ 'Today' ‧ EEEE");

  const overdueTasks = tasks.filter(
    (task) =>
      isPast(new Date(task.dateSelected)) &&
      !isToday(new Date(task.dateSelected))
  );

  const totalTasks = todayTasks.length + overdueTasks.length;

  return (
    <>
      <header className="sticky-header" style={{
            borderBottom: isSticky ? "1px solid rgba(211, 211, 211, 0.408)" : "",
          }}>
        <span
          style={{
            opacity: isSticky ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <div className="title">Today</div>
          {totalTasks > 0 ? (
            <div className="total-tasks">
              {`${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`}
            </div>
          ) : null}
        </span>
      </header>
      <div className="today-contents">
        <div
          className="header"
          style={{
            opacity: isSticky ? 0 : 1,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <h1 className="title">Today</h1>
          {totalTasks > 0 ? (
            <div className="total-tasks">
              <span className="material-icons-outlined">check_circle</span>
              <span>
                {`${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`}
              </span>
            </div>
          ) : null}
        </div>
        {overdueTasks.length > 0 && (
          <section className="overdue-section">
            <Overdue />
          </section>
        )}
        {overdueTasks.length > 0 && (
          <span className="today-tasks-date">{todayFormatted}</span>
        )}
        <section>
          <TodayTasks />
        </section>

        {isEditorOpen && !clickId && (
          <section className="editor-section">
            <Editor />
          </section>
        )}

        {!isEditorOpen && !clickId && (
          <section className="add-task-section">
            <Add />
          </section>
        )}

        {!isEditorOpen && tasks.length === 0 && (
          <section
            className="relax-mode"
            style={{
              mixBlendMode: isWindowResized ? "multiply" : "normal",
            }}
          >
            <RelaxMode />
          </section>
        )}
      </div>
    </>
  );
};

export default Today;
