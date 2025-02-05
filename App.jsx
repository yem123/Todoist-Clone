import { useState, useEffect, useRef } from "react";
import "./src/styles/app.css";
import MainContent from "./src/components/MainContent";
import Sidebar from "./src/components/Sidebar";
import ViewButton from "./src/components/ViewButton";
import ViewBar from "./src/components/ViewBar";
import useClickOutside from "./src/hooks/useClickOutside";
import { useSidebarContext } from "./src/context/SidebarContext";
import { Resizable } from "re-resizable";

function App() {
  const [isViewBarVisible, setIsViewBarVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const viewButtonRef = useRef(null);
  const viewBarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current.scrollTop > 15) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (content) {
        content.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
 
    const {
      sidebarRef,
      setShowItems,
      isSidebarOpen,
      setIsSidebarOpen,
      isWindowResized,
      resizerStyles,
    } = useSidebarContext();

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
          <Sidebar />
        </section>
      </Resizable>

      <section
        className="main-content-section"
        ref={contentRef}
        style={{
          backgroundColor: isSidebarOpen && isWindowResized ? "gray" : "white",
          pointerEvents: isSidebarOpen && isWindowResized ? "none" : "auto",
          opacity: isSidebarOpen && isWindowResized ? 0.5 : 1,
          userSelect: isSidebarOpen && isWindowResized ? "none" : "auto",
          cursor: isSidebarOpen && isWindowResized ? "not-allowed" : "default",
          left: isWindowResized
            ? isSidebarOpen
              ? "-200px"
              : "-100px"
            : isSidebarOpen
            ? 0
            : "-100px",
          transition: "left 0.2s ease-in-out",
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
        <MainContent isSticky={isSticky} />
      </section>
    </div>
  );
}

export default App;
