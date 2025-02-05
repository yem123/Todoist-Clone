import { useState } from "react";
import "../styles/overdue.css";
import {OverdueTasks} from "./TaskFilters"; 


const Overdue = () => {

  const [isExpand, setIsExpand] = useState(true);

  const handleExpand = () => {
    setIsExpand((prev) => !prev);
  }

  return (
    <>
      <div className="overdue-contents">
        <header className="overdue-header">
          <div className="overdue-toggle">
            <span className="material-symbols-outlined" onClick={handleExpand} style={{cursor:"pointer"}}>
              {isExpand ? "keyboard_arrow_down" : "keyboard_arrow_right"}
            </span>
            <span className="overdue-label">Overdue</span>
          </div>
          <div className="reschedule-btn">Reschedule</div>
        </header>
        <hr className="overdue-divider" />
        {isExpand && <OverdueTasks />}
      </div>
    </>
  );

};

export default Overdue;
