import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useSidebarContext } from "../context/SidebarContext";
import { useSortable } from "@dnd-kit/sortable";
import "../styles/todoItem.css";
import { isToday } from "date-fns";
import DateSelector from "./DateSelector";
import useDatePicker from "../hooks/useDatePicker";
import Editor from "./Editor";
import { getFormattedDate } from "../hooks/useDatePicker"

const TodoItem = ({ task, id }) => {

  const { isSidebarOpen, isWindowResized, } = useSidebarContext();
  const {
    handleEditTask,
    clickId,
    deleteTask,
    updateTask,
    isHovered,
    isRadioHovered,
    setIsHovered,
    setIsRadioHovered,
  } = useTaskContext();

  const { dateSelected, displayDate } = useDatePicker(task?.dateSelected || null);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });
  
  const onDeleteTask = () => deleteTask(id);
  const onEditTask = () => handleEditTask(task, id);

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add("dragging");
    } else {
      document.body.classList.remove("dragging");
    }
    return () => document.body.classList.remove("dragging");
  }, [isDragging]);


  return (
    <div className="task">
      {clickId !== task.id ? (
        <li
          className="task-item"
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          onMouseEnter={() => setIsHovered(task.id)}
          onMouseLeave={() => setIsHovered(null)}
          style={{
            backgroundColor:
              isSidebarOpen && isWindowResized ? "gray" : "white",
          }}
        >
          <div className="left-task">
            <span
              {...listeners}
              className={`drag-handle ${
                isHovered === task.id ? "show" : "hide"
              }`}
            >
              <span className="material-symbols-outlined">drag_indicator</span>
            </span>

            <div
              className="radio-button"
              onMouseUp={onDeleteTask}
              onMouseEnter={() => setIsRadioHovered(task.id)}
              onMouseLeave={() => setIsRadioHovered(null)}
            >
              <span className="material-symbols-outlined">
                {isRadioHovered === task.id
                  ? "check_circle"
                  : "radio_button_unchecked"}
              </span>
            </div>

            <div className="task-inputs">
              <span className="item">{task.taskName}</span>
              <p className="task-description">{task.description}</p>
              {task.dateSelected && !isToday((dateSelected)) && (
                <div className="task-date-selector">
                <DateSelector
                  dateSelected={dateSelected}
                  setDateSelected={(newDate) =>
                    updateTask({
                      ...task,
                      dateSelected: newDate,
                      displayDate: getFormattedDate(newDate),
                    })
                  }
                  displayDate={displayDate}
                  />
                  </div>
              )}
            </div>
          </div>
          <div className="task-actions">
            <div
              className={`action-buttons ${
                isHovered === task.id ? "show" : "hide"
              }`}
            >
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
          <hr className="task-divider" />
        </li>
      ) : (
        <section className="editor-section">
          <Editor />
        </section>
      )}
    </div>
  );
};

export default TodoItem;
