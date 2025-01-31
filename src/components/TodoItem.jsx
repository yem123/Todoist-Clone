import { useState } from "react";
import { useTaskContext } from "../context/useTaskContext";
import useSidebar from "../context/useSidebar";
import { useSortable } from "@dnd-kit/sortable";
import "../styles/todoItem.css";

const TodoItem = ({ id, index, task }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRadioHovered, setIsRadioHovered] = useState(false);

  const { isSidebarOpen, isWindowResized } = useSidebar();

  const { setEditTask, setIsEditorOpen, deleteTask } = useTaskContext();
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({ id });


  const onDeleteTask = () => deleteTask(index);

  const onEditTask = () => {
    setEditTask(task);
    setIsEditorOpen(true);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="task"
    >
      <li
        className="task-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isSidebarOpen && isWindowResized ? "gray" : "white",
        }}
      >
        <div className="left-task">
          <span className={`drag-handle ${isHovered ? "show" : "hide"}`}>
            <span className="material-symbols-outlined">drag_indicator</span>
          </span>

          <div
            className="radio-button"
            onMouseUp={onDeleteTask}
            onMouseEnter={() => setIsRadioHovered(true)}
            onMouseLeave={() => setIsRadioHovered(false)}
          >
            <span className="material-symbols-outlined">
              {isRadioHovered ? "check_circle" : "radio_button_unchecked"}
            </span>
          </div>

          <div className="task-inputs">
            <span className="item">{task.taskName}</span>
            <p className="task-description">{task.description}</p>
            {task.formatedDate && task.formatedDate !== "Today" && (
              <div className="task-event">
                <span className="material-symbols-outlined">event</span>
                <span>{task.formatedDate}</span>
              </div>
            )}
          </div>
        </div>
        <div className="task-actions">
          <div className={`action-buttons ${isHovered ? "show" : "hide"}`}>
            <span
              className="edit-task-btn material-symbols-outlined"
              onMouseUp={onEditTask}
            >
              edit_square
            </span>
            <span
              className="delete-task-btn material-symbols-outlined"
              onMouseUp={onDeleteTask}
            >
              delete
            </span>
          </div>

          <div className="task-category">
            <span className="category-label">Inbox</span>
            <span className="material-symbols-outlined">inbox</span>
          </div>
        </div>
      </li>
    </div>
  );
};

export default TodoItem;
