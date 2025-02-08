import { useState } from "react";
import "../styles/overdue.css";
import { OverdueTasks } from "./TaskFilters"; 
import { useTaskContext } from "../context/TaskContext";
import { isPast, isToday } from "date-fns";


const Overdue = () => {

  const [isExpand, setIsExpand] = useState(true);

  const { tasks } = useTaskContext();

  const overdueTasks = tasks.filter(
      (task) =>
        isPast(new Date(task.dateSelected)) &&
        !isToday(new Date(task.dateSelected))
    );

  const handleExpand = () => {
    setIsExpand((prev) => !prev);
  }

  return (
    <>
      <div className="overdue-contents">
        <header className="overdue-header">
          <div className="overdue-toggle">
            <span
              className="material-symbols-outlined"
              onClick={handleExpand}
              style={{ cursor: "pointer" }}
            >
              {isExpand ? "keyboard_arrow_down" : "keyboard_arrow_right"}
            </span>
            <span className="overdue-label">Overdue</span>
            <span
              style={{
                paddingLeft: "5px",
                color: "#f44336",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >{`( ${overdueTasks.length} ${
              overdueTasks.length === 1
                ? "task needs action"
                : "tasks need action"
            }... )`}</span>
          </div>
          <div className="reschedule-btn">Reschedule</div>
        </header>
        {isExpand && <OverdueTasks />}
      </div>
    </>
  );

};

export default Overdue;
