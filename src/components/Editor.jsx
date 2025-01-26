import { useState, useRef } from "react";
import useTaskForm from "../hooks/useTaskForm";
import useDatePicker from "../hooks/useDatePicker";
import useClickOutside from "../hooks/useClickOutside";
import { saveTaskUtil } from "../utils/taskUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/editor.css";
import "../styles/customDate.css";

function Editor({ tasks, setTasks, setEditTask, editTask, setIsEditorOpen }) {
  const { taskName, setTaskName, description, setDescription, resetForm } =
    useTaskForm(editTask);
  const { dateSelected, displayText, setDateSelected, resetDate } =
    useDatePicker(editTask?.dateSelected || null);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const dateButtonRef = useRef(null);
  const datePickerRef = useRef(null);

  useClickOutside([dateButtonRef, datePickerRef], () => setIsPickerOpen(false));

  const handleDateChange = (date) => {
    setDateSelected(date);
    setIsPickerOpen(false);
  };

  const saveTask = () => {
    saveTaskUtil({
      tasks,
      setTasks,
      taskName,
      description,
      dateSelected,
      displayText,
      editTask,
    });
    resetForm();
    resetDate();
    setEditTask(null);
    setIsEditorOpen(false);
  };

  const cancelEditor = () => {
    resetForm();
    resetDate();
    setEditTask(null);
    setIsEditorOpen(false);
  };

  const isDisabled = taskName.trim() === "";

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
          <div
            className="date-selector"
            ref={dateButtonRef}
            onClick={() => setIsPickerOpen((prev) => !prev)}
          >
            <span
              className={`material-icons-outlined small-icons ${
                dateSelected ? "selected-date" : ""
              }`}
            >
              event
            </span>
            {!(dateSelected || displayText) ? (
              <span>Date</span>
            ) : (
              <span className="selected-date">{displayText}</span>
            )}
          </div>
          {(dateSelected || displayText) && (
            <div className="cancel" onClick={resetDate}>
              <span className="material-symbols-outlined small-icons">
                close
              </span>
            </div>
          )}
        </div>
        {isPickerOpen && (
          <div className="react-date-picker" ref={datePickerRef}>
            <DatePicker
              selected={dateSelected}
              onChange={handleDateChange}
              minDate={new Date()}
              inline
            />
          </div>
        )}
      </div>

      <div className="editor-actions">
        <div className="editor-task-category onhover">
          <span className="material-icons-outlined small-icons">inbox</span>
          <span>Inbox</span>
          <span className="material-icons-outlined small-icons">
            arrow_drop_down
          </span>
        </div>

        <div className="action-buttons">
          <button className="cancel" onClick={cancelEditor}>
            Cancel
          </button>
          <button
            className={isDisabled ? "disabled" : "save"}
            disabled={isDisabled}
            onClick={saveTask}
          >
            Add task
          </button>
        </div>
      </div>
    </section>
  );
}

export default Editor;
