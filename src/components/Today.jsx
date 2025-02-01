import useTaskContext from "../context/useTaskContext";
import useSidebarContext from "../context/useSidebarContext";
import Add from "./Add";
import Overdue from "./Overdue";
import Editor from "./Editor";
import { TodayTasks } from "./TaskFilters";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";
import { format, isPast, isToday } from "date-fns";

const Today = () => {
  const { isWindowResized } = useSidebarContext();
  const { tasks, isEditorOpen } = useTaskContext();

  const todayTasks = tasks.filter((task) =>
    isToday(new Date(task.dateSelected))
  );
  const todayFormatted = format(new Date(), "dd MMM ‧ 'Today' ‧ EEEE");

  const overdueTasks = tasks.filter(
    (task) =>
      isPast(new Date(task.dateSelected)) && !isToday(new Date(task.dateSelected))
  );

  const totalTasks = todayTasks.length + overdueTasks.length;

  return (
      <div className="today-contents">
        <header>
          <h1>Today</h1>
          {todayTasks.length > 0 ? (
            <div className="total-tasks">
              <span className="material-icons-outlined">check_circle</span>
              <span>
                {`${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`}
              </span>
            </div>
          ) : null}
        </header>
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

        {isEditorOpen && (
          <section className="editor-section">
            <Editor />
          </section>
        )}

        {!isEditorOpen && (
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
  );
};

export default Today;
