import { useTaskContext } from "../context/TaskContext";
import { useSidebarContext } from "../context/SidebarContext";
import Add from "./Add";
import Editor from "./Editor";
import { InboxTasks } from "./TaskFilters";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";

const Inbox = () => {
  const { isWindowResized } = useSidebarContext();
  const { tasks, isEditorOpen, clickId, isSticky } = useTaskContext();

  return (
    <>
      <header
        className="today-sticky-box"
        style={{
          borderBottom: isSticky ? "1px solid rgba(211, 211, 211, 0.408)" : "",
        }}
      >
        <div
          className="title"
          style={{
            opacity: isSticky ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          Inbox
        </div>
      </header>
      <div className="today-contents">
        <div
          className="header"
          style={{
            opacity: isSticky ? 0 : 1,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <h1 className="title">Inbox</h1>
        </div>
        <section>
          <InboxTasks />
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

        {!isEditorOpen &&
          tasks.length === 0 && (
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

export default Inbox;
