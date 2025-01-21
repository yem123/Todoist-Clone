import { useState } from "react";
import Add from "./Add";
import Editor from "./Editor";
{
  /*import Overdue from "./Overdue";*/
}
import Task from "./Task";
import "../styles/today.css";
import RelaxMode from "./RelaxMode";

const Today = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [tasks, setTasks] = useState([]);

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsEditorOpen(true);
  };

  const handleAddTask = () => {
    setIsEditorOpen(true);
  };

  return (
    <main>
      <section className="today-contents">
        <header>
          <h1>Today</h1>
          {tasks.length > 0 ? (
            <div className="total-tasks">
              <span className="material-icons-outlined">check_circle</span>
              <span>
                {`${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
              </span>
            </div>
          ) : (
            ""
          )}
        </header>
        {/*<section className="overdue-section">
          <Overdue setIsEditorOpen={setIsEditorOpen} />
        </section>
        */}
        <section>
          <Task
            tasks={tasks}
            setTasks={setTasks}
            handleEditTask={handleEditTask}
          />
        </section>
        {isEditorOpen && (
          <section className="editor-section">
            <Editor
              tasks={tasks}
              setTasks={setTasks}
              setEditTask={setEditTask}
              editTask={editTask}
              setIsEditorOpen={setIsEditorOpen}
            />
          </section>
        )}

        {!isEditorOpen && (
          <section className="add-task-section">
            <Add handleAddTask={handleAddTask} />
          </section>
        )}
        {!isEditorOpen && tasks.length === 0 && (
          <section>
            <RelaxMode />
          </section>
        )}
      </section>
    </main>
  );
};

export default Today;
