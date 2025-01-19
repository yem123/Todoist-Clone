import { useState } from "react";
import "../styles/task.css";

const Task = () => {
  const [isEnter, setIsEnter] = useState(false);

  return (
    <section className="task">
      <ul>
        <li
          className="task-item"
          onMouseEnter={() => setIsEnter(true)}
          onMouseLeave={() => setIsEnter(false)}
        >
          <div className="left-task">
            <span className={isEnter ? "show-me" : "hide-me"}>
              <span className="material-symbols-outlined">drag_indicator</span>
            </span>
            <span className="material-symbols-outlined">
              radio_button_unchecked
            </span>
            <div className="task-inputs">
              <span className="item">Shoping</span>
              <p className="task-description">do not forget to...</p>
              <div className="task-event">
                <span className="material-symbols-outlined">event</span>
                <span>Yesterday</span>
              </div>
            </div>
          </div>
          <div className="task-actions">
            <div
              className={`action-buttons ${isEnter ? "show-me" : "hide-me"}`}
            >
              <div className="edit-task-btn">
                <span className="material-symbols-outlined">edit_square</span>
              </div>
              <div className="delete-task-btn">
                <span className="material-symbols-outlined">delete</span>
              </div>
            </div>

            <div className="task-category">
              <span className="category-label">Inbox</span>
              <span className="material-symbols-outlined">inbox</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Task;
