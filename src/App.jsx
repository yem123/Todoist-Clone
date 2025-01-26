import { useState, useRef } from "react";
import "./app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import ViewButton from "./components/ViewButton";
import ViewBar from "./components/ViewBar";
import useClickOutside from "./hooks/useClickOutside";
import useSidebarLogic from "./hooks/useSidebarLogic";
import { Resizable } from "re-resizable";

function App() {
  const [isViewBarVisible, setIsViewBarVisible] = useState(false);
  const viewButtonRef = useRef(null);
  const viewBarRef = useRef(null);
 
   const {
    sidebarRef,
    showItems,
    setShowItems,
    isSidebarOpen,
    setIsSidebarOpen,
     sidebarWidth,
    setSidebarWidth,
    isWindowResized,
    resizerStyles,
  } = useSidebarLogic();

  useClickOutside([sidebarRef], () => {
    if (isSidebarOpen && isWindowResized) {
      setIsSidebarOpen(false);
    }
  });
  
  useClickOutside([viewButtonRef, viewBarRef], () =>
    setIsViewBarVisible(false)
   );

  return (
    <div className="app">
      <Resizable
        defaultSize={{ width: 300 }}
        minWidth={208}
        maxWidth={420}
        enable={{ right: true }}
        style={resizerStyles}
      >
        <section
          ref={sidebarRef}
          className="side-bar-section no-select"
          onMouseEnter={() => setShowItems(true)}
          onMouseLeave={() => setShowItems(false)}
        >
          <Sidebar
            showItems={showItems}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            setSidebarWidth={setSidebarWidth}
            sidebarWidth={sidebarWidth}
          />
        </section>
      </Resizable>

      <section
        className="main-content-section"
        style={{
          backgroundColor: isSidebarOpen && isWindowResized ? "gray" : "white",
          pointerEvents: isSidebarOpen && isWindowResized ? "none" : "auto",
          marginLeft: !isWindowResized
            ? isSidebarOpen
              ? `${0.1 * sidebarWidth}px`
              : `${-0.2 * sidebarWidth}px`
            : "-100px",
          transition: "all 0.3s ease",
        }}
      >
        <section
          className="view-button-section no-select"
          ref={viewButtonRef}
          onClick={() => setIsViewBarVisible((prev) => !prev)}
        >
          <ViewButton />
        </section>

        {isViewBarVisible && (
          <section className="viewbar-section" ref={viewBarRef}>
            <ViewBar />
          </section>
        )}
        <MainContent />
      </section>
    </div>
  );
}

export default App;
