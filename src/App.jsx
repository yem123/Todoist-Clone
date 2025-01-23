import { useState } from "react";
import "./app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
function App() {
  const [showItems, setShowItems] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="app">
        <section
          className="side-bar-section no-select"
          onMouseEnter={() => setShowItems(true)}
          onMouseLeave={() => setShowItems(false)}
          style={{
            animation: `${
              isSidebarOpen
                ? "sidebarSlideIn 0.3s forwards"
                : "sidebarSlideOut 0.3s forwards"
            }`,
          }}
        >
          <Sidebar showItems={showItems} />
        </section>

        <section
          className="toggle-view"
          onClick={toggleSidebar}
          style={{
            animation: `${
              isSidebarOpen
                ? "viewSlideIn 0.3s forwards"
                : "viewSlideOut 0.3s forwards"
            }`,
          }}
        >
          {!isSidebarOpen && (
            <span className="material-icons view-notif">
              access_time_filled
            </span>
          )}
          <span className="material-symbols-outlined onhover">
            view_sidebar
          </span>
        </section>

        <section
          className="main-content-section"
          style={{
            animation: `${
              isSidebarOpen
                ? "mainSlideIn 0.3s forwards"
                : "mainSlideOut 0.3s forwards"
            }`,
          }}
        >
          <MainContent />
        </section>
      </div>
    </>
  );
}

export default App;
