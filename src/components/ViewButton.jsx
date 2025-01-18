import "../styles/viewButton.css";
const ViewButton = () => {
  return (
    <div className="view-button" data-tooltip="view options menu">
      <span className="view-icon">
        <span className="material-symbols-outlined">tune</span>
      </span>
      <span>View</span>
    </div>
  );
};

export default ViewButton;
