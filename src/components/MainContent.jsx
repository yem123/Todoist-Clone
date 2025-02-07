import { Routes, Route, Navigate } from "react-router-dom";
import "../styles/mainContent.css";
import Today from "./Today";
import Upcoming from "./Upcoming";

const MainContent = ({ isSticky }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route
          path="/today"
          element={
            <section className="today-section no-select">
              <Today isSticky={isSticky} />
            </section>
          }
        />
        <Route
          path="/upcoming"
          element={
            <section className="upcoming-section no-select">
              <Upcoming isSticky={isSticky} />
            </section>
          }
        />
      </Routes>
    </>
  );
};

export default MainContent;
