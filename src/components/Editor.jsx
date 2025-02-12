import { useRef, useEffect } from "react";
import useTaskForm from "../hooks/useTaskForm";
import useDatePicker from "../hooks/useDatePicker";
import { saveTaskUtil } from "../utils/taskUtils";
import { useTaskContext } from "../context/TaskContext";
import { useSidebarContext } from "../context/SidebarContext";
import DateSelector from "./DateSelector";
import "../styles/customDate.css";
import "../styles/editor.css";

function Editor({ className, editorRef }) {
  
  const inputRef = useRef(null);

  const { isWindowResized } = useSidebarContext();

  const {
    tasks,
    setTasks,
    editTask,
    setEditTask,
    setIsEditorOpen,
    isEditorOpen,
    setIsClickId,
    setIsHovered
  } = useTaskContext();

  const { taskName, setTaskName, description, setDescription, resetForm } =
    useTaskForm(editTask);
  const { dateSelected, displayDate, setDateSelected, resetDate } =
    useDatePicker(editTask?.dateSelected || null);

  const saveTask = () => {
    saveTaskUtil({
      tasks,
      setTasks,
      taskName,
      description,
      dateSelected,
      displayDate,
      editTask,
    });
    resetForm();
    resetDate();
    setEditTask(null);
    setIsClickId(null);
  };

  const cancelEditor = () => {
    resetForm();
    setEditTask(null);
    setIsEditorOpen(false);
    setIsClickId(null);
    setIsHovered(false);
  };

  useEffect(() => {
    const keepFocus = () => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    };

    const interval = setInterval(keepFocus, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`editor-container ${className}`} ref={editorRef}>
      <div className="input-contents">
        <input
          ref={inputRef}
          className="text-field"
          value={taskName}
          placeholder="Task name"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          className="description"
          value={description}
          placeholder="Description (optional)"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="editor-date-selector">
          <DateSelector
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            displayDate={displayDate}
          />
          {dateSelected && (
            <div className="close" onClick={() => setDateSelected(null)}>
              <span className="material-symbols-outlined">close</span>
            </div>
          )}
        </div>
      </div>
      <div className="editor-actions">
        <div className="editor-task-category onhover">
          <span className="material-icons-outlined">inbox</span>
          <span>Inbox</span>
          <span className="material-icons-outlined">arrow_drop_down</span>
        </div>

        <div className="editor-actions">
          <button className="cancel" onClick={cancelEditor}>
            Cancel
          </button>
          <button
            className={taskName.trim() === "" ? "disabled" : "save"}
            disabled={taskName.trim() === ""}
            onClick={saveTask}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default Editor;
