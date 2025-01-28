import { useState, useRef } from "react";
import "./src/styles/app.css";
import MainContent from "./src/components/MainContent";
import Sidebar from "./src/components/Sidebar";
import ViewButton from "./src/components/ViewButton";
import ViewBar from "./src/components/ViewBar";
import useClickOutside from "./src/hooks/useClickOutside";
import useSidebar from "./src/context/useSidebar";
import { Resizable } from "re-resizable";

function App() {
  const [isViewBarVisible, setIsViewBarVisible] = useState(false);
  const viewButtonRef = useRef(null);
  const viewBarRef = useRef(null);
 
    const {
      sidebarRef,
      setShowItems,
      isSidebarOpen,
      setIsSidebarOpen,
      isWindowResized,
      sidebarWidth,
      resizerStyles,
    } = useSidebar();

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
          />
        </section>
      </Resizable>

      <section
        className="main-content-section"
        style={{
          backgroundColor: isSidebarOpen && isWindowResized ? "gray" : "white",
          pointerEvents: isSidebarOpen && isWindowResized ? "none" : "auto",
          userSelect: isSidebarOpen && isWindowResized ? "none" : "auto",
          marginLeft: !isWindowResized
            ? isSidebarOpen
              ? `${-0.3 * sidebarWidth}px`
              : `${-0.01 * sidebarWidth}px`
            : "-100px",
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
