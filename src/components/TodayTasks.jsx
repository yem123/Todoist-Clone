import "../styles/today-tasks.css";
import Task from "./Task";

function TodayTasks({ setIsEditorOpen }) {
  return (
    <div className="today-tasks">
      <span className="today-tasks-date">13 Jan ‧ Today ‧ Monday</span>
      <div>
        <Task setIsEditorOpen={setIsEditorOpen} />
      </div>
    </div>
  );
}

export default TodayTasks;
