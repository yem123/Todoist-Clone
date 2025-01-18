import "../styles/mainContent.css";
import ViewButton from "./ViewButton";
import Today from "./Today";

const MainContent = () => {
  return (
    <div className="main-contents">
      <div className="today-section no-select">
        <Today />
      </div>
      <div className="view-button-section no-select">
        <ViewButton />
      </div>
    </div>
  );
};

export default MainContent;
