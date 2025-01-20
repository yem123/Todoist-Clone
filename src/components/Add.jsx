import "../styles/add.css";
const Add = ({ handleAddTask }) => {
  return (
    <div className="add-task-button" onClick={handleAddTask}>
      <span className="material-symbols-outlined">add</span>
      <span className="add-label"> Add task</span>
    </div>
  );
};

export default Add;
