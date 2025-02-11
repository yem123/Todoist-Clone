import "../styles/viewButton.css";
import { useSidebarContext } from "../context/SidebarContext";
const ViewButton = () => {

  const { isWindowResized } = useSidebarContext();

  return (
    <div className="view-button" data-tooltip="view options menu">
        <span className="material-symbols-outlined">tune</span>
      {!isWindowResized && <span>View</span>}
    </div>
  );
};

export default ViewButton;
