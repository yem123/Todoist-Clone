import { useState, useEffect, useRef } from "react";
import "../styles/editor.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/customDate.css";
import { format, parse } from "date-fns";

function Editor({ tasks, setTasks, setEditTask, editTask, setIsEditorOpen }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(null);
  const [displayText, setDisplayText] = useState("");

  const today = new Date();

  const handleDateChange = (newDate) => {
    const today = new Date();
    const yesterday = new Date();
    const tomorrow = new Date();

    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (d) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const formattedDate = formatDate(newDate);
    const formattedToday = formatDate(today);
    const formattedYesterday = formatDate(yesterday);
    const formattedTomorrow = formatDate(tomorrow);

    let text = format(newDate, "dd MMM");

    if (formattedDate.getTime() === formattedToday.getTime()) {
      text = "Today";
    } else if (formattedDate.getTime() === formattedYesterday.getTime()) {
      text = "Yesterday";
    } else if (formattedDate.getTime() === formattedTomorrow.getTime()) {
      text = "Tomorrow";
    }

    setDisplayText(text);

    setDateSelected(newDate);
    setIsPickerOpen(false);
  };

  const handleDateCancel = () => {
    setDateSelected(null);
    setDisplayText("");
  };

  const dateButtonRef = useRef(null);
  const datePickerRef = useRef(null);

  const handleDocumentClick = (event) => {
    dateButtonRef.current &&
    datePickerRef.current &&
    (dateButtonRef.current.contains(event.target) ||
      datePickerRef.current.contains(event.target))
      ? setIsPickerOpen(true)
      : setIsPickerOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const isDisabled = taskName.trim() === "";

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.taskName || "");
      setDescription(editTask.description || "");
      setDisplayText(editTask.formatedDate || "");
      setDateSelected(editTask.setDateSelected || null);
    }
  }, [editTask]);

  const resetEditor = () => {
    setTaskName("");
    setDescription("");
    setEditTask(null);
    setIsEditorOpen(false);
    setDateSelected(null);
  };

  const saveTask = () => {
    const updatedTasks = [...tasks];
    if (editTask) {
      const index = tasks.findIndex((task) => task.id === editTask.id);
      updatedTasks[index] = {
        ...editTask,
        taskName: taskName.trim(),
        description: description.trim(),
        dateSelected: dateSelected,
        formatedDate: displayText,
      };
    } else {
      const newTask = {
        id: Date.now(),
        taskName: taskName.trim(),
        description: description.trim(),
        dateSelected: dateSelected,
        formatedDate: displayText,
      };
      updatedTasks.push(newTask);
    }

    setTasks(updatedTasks);
    resetEditor();
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
              <span> Date </span>
            ) : (
              <span className="selected-date"> {displayText} </span>
            )}
          </div>
          {(dateSelected || displayText) && (
            <div className="cancel" onClick={handleDateCancel}>
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
              minDate={today}
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
          <button className="cancel" onClick={resetEditor}>
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
