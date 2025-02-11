import { Routes, Route, Navigate } from "react-router-dom";
import "../styles/mainContent.css";
import Today from "./Today";
import Upcoming from "./Upcoming";
import Inbox from "./Inbox";

const MainContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route
          path="/inbox"
          element={
            <section className="inbox-section no-select">
              <Inbox />
            </section>
          }
        />
        <Route
          path="/today"
          element={
            <section className="today-section no-select">
              <Today />
            </section>
          }
        />
        <Route
          path="/upcoming"
          element={
            <section className="upcoming-section no-select">
              <Upcoming />
            </section>
          }
        />
      </Routes>
    </>
  );
};

export default MainContent;
