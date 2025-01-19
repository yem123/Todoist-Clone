import { useState } from "react";
import Add from "./Add";
import Editor from "./Editor";
import Overdue from "./Overdue";
import TodayTasks from "./TodayTasks";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";

const Today = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

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
          <Overdue setIsEditorOpen={setIsEditorOpen} />
        </section>
        <section className="today-tasks-section">
          <TodayTasks setIsEditorOpen={setIsEditorOpen} />
        </section>
        {isEditorOpen && (
          <section className="editor-section">
            <Editor setIsEditorOpen={setIsEditorOpen} />
          </section>
        )}
        <section
          className="add-task-section"
          onClick={() => setIsEditorOpen(true)}
        >
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
