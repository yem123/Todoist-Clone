import { useTaskContext } from "../context/TaskContext";
import "../styles/add.css";

const Add = () => {

  const { handleAddTask, handlePlusButton } = useTaskContext();

  return (
    <>
      <div className="add-task-button" onClick={handleAddTask}>
        <span className="material-symbols-outlined">add</span>
        <span className="add-label"> Add task</span>
      </div>
      <div className="plus-button" onClick={handlePlusButton}>
        <span className="material-symbols-outlined">add</span>
      </div>
    </>
  );
};

export default Add;
