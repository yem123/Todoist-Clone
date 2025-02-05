import "../styles/mainContent.css";
import Today from "./Today";

const MainContent = ({isSticky}) => {

  return (
    < >
      <section className="today-section no-select">
        <Today isSticky={ isSticky } />
      </section>
    </>
  );
};

export default MainContent;
