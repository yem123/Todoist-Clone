import { useTaskContext } from "../context/TaskContext";
import { useSidebarContext } from "../context/SidebarContext";
import Add from "./Add";
import Editor from "./Editor";
import { InboxTasks } from "./TaskFilters";
import "../styles/inbox.css";
import RelaxMode from "./RelaxMode";

const Inbox = () => {
  const { isWindowResized } = useSidebarContext();
  const { tasks, isEditorOpen, isClickId, isSticky } = useTaskContext();

  return (
    <>
      <header
        className="inbox-sticky-box"
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
      <div className="inbox-contents">
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

        {isEditorOpen && isClickId === null && ( 
            <Editor className="editor-section" />
        )}

        {!isEditorOpen && isClickId === null && (
          <section className="add-task-section">
            <Add />
          </section>
        )}

        {!isEditorOpen && tasks.length === 0 && (
          <section
            className="relax-mode"
          >
            <RelaxMode  />
          </section>
        )}
      </div>
    </>
  );
};

export default Inbox;
