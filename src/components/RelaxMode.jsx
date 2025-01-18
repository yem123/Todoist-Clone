import "../styles/relax-mode.css";
const RelaxMode = () => {
  return (
    <div className="no-tasks">
      <img
        className="today-image"
        src="../rabbit.png"
        alt="Celebratory rabbit"
      />
      <div className="task-motivation">
        <h3>Enjoy your day, yemane.measho.</h3>
        <p>
          Today you completed 5 tasks.
          <span>
            <br />
            Congratulations!
          </span>
        </p>
      </div>
    </div>
  );
};

export default RelaxMode;
