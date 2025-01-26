import "../styles/mainContent.css";
import Today from "./Today";

const MainContent = ({isWindowResized}) => {

  return (
    <div className="main-contents">
      <section className="today-section no-select">
        <Today isWindowResized={isWindowResized } />
      </section>
    </div>
  );
};

export default MainContent;
