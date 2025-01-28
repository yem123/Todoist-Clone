import "../styles/overdue.css";
import Task from "./mainContent/Task/Task";

const Overdue = ({ setIsEditorOpen }) => {
  return (
    <div className="overdue-contents">
      <header className="overdue-header">
        <div className="overdue-toggle">
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
          <span className="overdue-label">Overdue</span>
        </div>
        <div className="reschedule-btn">Reschedule</div>
      </header>
      <Task setIsEditorOpen={setIsEditorOpen} />
      <span className="today-tasks-date">13 Jan ‧ Today ‧ Monday</span>
    </div>
  );
};

export default Overdue;
