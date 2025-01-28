import { useTaskContext } from "../context/useTaskContext";
import Add from "./Add";
import Editor from "./Editor";
import Task from "./Task";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";
import useSidebar from "../context/useSidebar";
const Today = () => {

  const { isWindowResized } = useSidebar();

  const {
    tasks,
    isEditorOpen
  } = useTaskContext();

  return (
    <main>
      <section className="today-contents">
        <header>
          <h1>Today</h1>
          {tasks.length > 0 ? (
            <div className="total-tasks">
              <span className="material-icons-outlined">check_circle</span>
              <span>
                {`${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
              </span>
            </div>
          ) : null}
        </header>
        {/*<section className="overdue-section">
          <Overdue setIsEditorOpen={setIsEditorOpen} />
        </section>
        */}
        <section>
          <Task />
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
      </section>
    </main>
  );
};

export default Today;