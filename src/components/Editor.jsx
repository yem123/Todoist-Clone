import useTaskForm from "../hooks/useTaskForm";
import useDatePicker from "../hooks/useDatePicker";
import { saveTaskUtil } from "../utils/taskUtils";
import { useTaskContext } from "../context/TaskContext";
import DateSelector from "./DateSelector";
import "../styles/customDate.css";
import "../styles/editor.css";

function Editor() {
  const {
    tasks,
    setTasks,
    editTask,
    setEditTask,
    setIsEditorOpen,
    setClickId,
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
    setClickId(null);
  };

  const cancelEditor = () => {
    resetForm();
    setEditTask(null);
    setIsEditorOpen(false);
    setClickId(null);
    setIsHovered(false);
  };

  return (
    <section className="editor-container">
      <div className="input-contents">
        <input
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
        <div className="date-actions onhover">
        <DateSelector
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          displayDate={displayDate}
          />
          {dateSelected && (
                  <div className="cancel" onClick={() => setDateSelected(null)}>
                    <span className="material-symbols-outlined small-icons">close</span>
                  </div>
                )}
          </div>
      </div>
      <div className="editor-actions">
        <div className="editor-task-category onhover">
          <span className="material-icons-outlined small-icons">inbox</span>
          <span>Inbox</span>
          <span className="material-icons-outlined small-icons">
            arrow_drop_down
          </span>
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
