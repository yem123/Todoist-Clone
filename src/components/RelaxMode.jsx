import "../styles/relax-mode.css";
import { useTaskContext } from "../context/TaskContext";
const RelaxMode = () => {
  const { countCompleted } = useTaskContext();
  return (
    <div className="no-tasks">
      <img
        className="today-image"
        src="../rabbit.png"
        loading="lazy"
        alt="Celebratory rabbit"
      />

      <div className="task-motivation">
        {countCompleted > 0 ? (
          <div>
          <h3>Enjoy your day, user_name.</h3>
          <p>
            Today you completed {countCompleted} tasks.
            <span>
              <br />
              Congratulations!
            </span>
            </p>
            </div>
        ) : (
          <div>
            <h3>Ready to crush your goals?</h3>
            <p>Add your first task for Today and let&apos;s get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelaxMode;
