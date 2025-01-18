import "../styles/overdue.css";
import Task from "./Task";

const Overdue = () => {
  return (
    <div className="overdue-contents">
      <header className="overdue-header">
        <div className="overdue-toggle">
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
          <span className="overdue-label">Overdue</span>
        </div>
        <div className="reschedule-btn">Reschedule</div>
      </header>
      <Task />
    </div>
  );
};

export default Overdue;
