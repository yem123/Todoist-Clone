import "./app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import ViewButton from "./components/ViewButton";
import ViewBar from "./components/ViewBar";
import useViewToggle from "./hooks/useViewToggle";
import useSidebarLogic from "./hooks/useSidebarLogic";
import { Resizable } from "re-resizable";

function App() {
  const { viewButtonRef, viewBarRef, setIsViewBarVisible, isViewBarVisible } =
    useViewToggle();

  const {
    sidebarRef,
    showItems,
    setShowItems,
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarWidth,
    isWindowResized,
    resizerStyles,
    mainContentMarginLeft,
  } = useSidebarLogic();

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
            sidebarWidth={sidebarWidth}
          />
        </section>
      </Resizable>

      <section
        className="main-content-section"
        style={{
          backgroundColor: isSidebarOpen && isWindowResized ? "gray" : "white",
          pointerEvents: isSidebarOpen && isWindowResized ? "none" : "auto",
          transition: "all 0.5s ease",
          marginLeft: mainContentMarginLeft,
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
