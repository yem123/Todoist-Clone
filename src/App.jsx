import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar"
import ViewButton from "./components/ViewButton";
import ViewBar from "./components/ViewBar";
import useClickOutside from "./hooks/useClickOutside";
import { useSidebarContext } from "./context/SidebarContext";
import { Resizable } from "re-resizable";
import Loading from "./components/Loading";
import { useTaskContext } from "./context/TaskContext";
import Editor from "./components/Editor";

function App() {
  const [isViewBarVisible, setIsViewBarVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const viewButtonRef = useRef(null);
  const viewBarRef = useRef(null);
  const contentRef = useRef(null);
  const addButtonRef = useRef(null);
  const editorRef = useRef(null);

  const { setIsSticky, isClickId, setIsClickId, setIsEditorOpen } = useTaskContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
  }, [setIsSticky]);
 
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
  
  useClickOutside([addButtonRef, editorRef], () => {
    setIsClickId(null);
    setIsEditorOpen(false);
  }
  );

  return (
    <>
      {!isLoaded && <Loading />}

      <Router>
        <div
          className="app"
          style={{
            opacity: isLoaded ? 1 : 0,
          }}
        >
          {!isWindowResized ? (
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
                <div className="sidebar-section">
                  <Sidebar addButtonRef={addButtonRef} />
                </div>
              </section>
            </Resizable>
          ) : (
            <div className="navbar-section">
              <NavBar />
            </div>
          )}

          <section
            className="main-content-section"
            ref={contentRef}
            style={{
              backgroundColor:
                isSidebarOpen && isWindowResized ? "gray" : "white",
              opacity: isSidebarOpen && isWindowResized ? 0.5 : 1,
              userSelect: isSidebarOpen && isWindowResized ? "none" : "auto",
              cursor: isSidebarOpen && isWindowResized ? "none" : "pointer",
              overflow: isSidebarOpen && isWindowResized ? "hidden" : "auto",
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
          {isClickId === "globalEditor" && (
            <Editor className="global-editor" editorRef={editorRef} />
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
