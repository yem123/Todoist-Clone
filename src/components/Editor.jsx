import { useState, useEffect } from "react";
import "../styles/editor.css";

function Editor({ tasks, setTasks, setEditTask, editTask, setIsEditorOpen }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const isDisabled = taskName === "";

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.taskName);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const saveTask = () => {
    if (taskName.trim() !== "") {
      const updatedTasks = [...tasks];
      if (editTask) {
        const index = tasks.findIndex((task) => task === editTask);
        updatedTasks[index] = {
          taskName: taskName.trim(),
          description: description.trim(),
        };
      } else {
        updatedTasks.push({
          taskName: taskName.trim(),
          description: description.trim(),
        });
        setTaskName("");
        setEditTask(null);
        setDescription("");
        setIsEditorOpen(false);
      }

      setTasks(updatedTasks);
    }
    closeEditor();
  };

  const closeEditor = () => {
    setTaskName("");
    setEditTask(null);
    setIsEditorOpen(false);
    setDescription("");
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
        ></input>
        <div className="date-selector onhover">
          <span className="material-icons-outlined">event</span>
          <span>Date</span>
        </div>
      </div>

      <div className="editor-actions">
        <div className="editor-task-category onhover">
          <span className="material-icons-outlined">inbox</span>
          <span>Inbox</span>
          <span className="material-icons-outlined">arrow_drop_down</span>
        </div>

        <div className="action-buttons">
          <button className="cancel" onClick={closeEditor}>
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
