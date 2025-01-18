import Add from "./Add";
import Editor from "./Editor";
import Overdue from "./Overdue";
import TodayTasks from "./TodayTasks";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";

const Today = () => {
  return (
    <main>
      <section className="today-contents">
        <header>
          <h2>Today</h2>
          <div className="total-tasks">
            <span className="material-icons-outlined">check_circle</span>
            <span>2 tasks</span>
          </div>
        </header>

        <section className="overdue-section">
          <Overdue />
        </section>
        <section className="today-tasks-section">
          <TodayTasks />
        </section>

        <section className="editor-section">
          <Editor />
        </section>
        <section className="add-task-section">
          <Add />
        </section>
        <section>
          <RelaxMode />
        </section>
      </section>
    </main>
  );
};

export default Today;
