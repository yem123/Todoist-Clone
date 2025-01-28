import "../styles/mainContent.css";
import Today from "./Today";

const MainContent = () => {

  return (
    <div className="main-contents">
      <section className="today-section no-select">
        <Today />
      </section>
    </div>
  );
};

export default MainContent;
