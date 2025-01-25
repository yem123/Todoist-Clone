import { useState, useEffect, useRef } from "react";
import "./app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { Resizable } from "re-resizable";

function App() {
  const [showItems, setShowItems] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isWindowResized, setIsWindowResized] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (sidebarRef.current) {
        setSidebarWidth(sidebarRef.current.offsetWidth);
      }
    };

    const handleWinResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsWindowResized(true);
      } else {
        setIsSidebarOpen(true);
        setIsWindowResized(false);
      }
    };

    updateSidebarWidth();
    handleWinResize();

    window.addEventListener("resize", handleWinResize);

    const sidebarObserver = new ResizeObserver(() => {
      updateSidebarWidth();
    });
    if (sidebarRef.current) {
      sidebarObserver.observe(sidebarRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleWinResize);
      sidebarObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="app">
        <Resizable
          defaultSize={{
            width: 300,
          }}
          minWidth={208}
          maxWidth={420}
          enable={{ right: true }}
          style={{
            zIndex: "10000",
            animation: `${
              isSidebarOpen
                ? "sidebarSlideIn 0.3s forwards"
                : "sidebarSlideOut 0.3s forwards"
            }`,
            borderRight: "2px solid #ddd",
          }}
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
            transition: "all 0.3s ease",
            transform:
              !isWindowResized && !isSidebarOpen
                ? "translateX(-20%)"
                : isSidebarOpen
                ? "translateX(-10%)"
                : "translateX(-70%)",
          }}
        >
          <MainContent />
        </section>
      </div>
    </>
  );
}

export default App;
