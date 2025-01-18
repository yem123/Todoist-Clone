import "../styles/today-tasks.css";
import Task from "./Task";

function TodayTasks() {
  return (
    <div>
      <span className="today-tasks-date">13 Jan ‧ Today ‧ Monday</span>
      <Task />
    </div>
  );
}

export default TodayTasks;
