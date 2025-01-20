import { useState } from "react";
import "../styles/task.css";

const Task = ({ tasks, setTasks, handleEditTask }) => {
  const [isEnter, setIsEnter] = useState(null);

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <section className="task">
      <ul>
        {tasks.map((task, index) => (
          <li
            className="task-item"
            key={index}
            onMouseEnter={() => setIsEnter(index)}
            onMouseLeave={() => setIsEnter(null)}
          >
            <div className="left-task">
              <span className={isEnter == index ? "show-me" : "hide-me"}>
                <span className="material-symbols-outlined">
                  drag_indicator
                </span>
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => deleteTask(index)}
              >
                radio_button_unchecked
              </span>
              <div className="task-inputs">
                <span className="item">{task.taskName}</span>
                <p className="task-description">{task.description}</p>
                <div className="task-event">
                  <span className="material-symbols-outlined">event</span>
                  <span>Yesterday</span>
                </div>
              </div>
            </div>
            <div className="task-actions">
              <div
                className={`action-buttons ${
                  isEnter == index ? "show-me" : "hide-me"
                }`}
              >
                <div
                  className="edit-task-btn"
                  onClick={() => handleEditTask(task)}
                >
                  <span className="material-symbols-outlined">edit_square</span>
                </div>
                <div
                  className="delete-task-btn"
                  onClick={() => deleteTask(index)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </div>
              </div>

              <div className="task-category">
                <span className="category-label">Inbox</span>
                <span className="material-symbols-outlined">inbox</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Task;
