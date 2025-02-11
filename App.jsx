import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./src/styles/app.css";
import MainContent from "./src/components/MainContent";
import Sidebar from "./src/components/Sidebar";
import ViewButton from "./src/components/ViewButton";
import ViewBar from "./src/components/ViewBar";
import useClickOutside from "./src/hooks/useClickOutside";
import { useSidebarContext } from "./src/context/SidebarContext";
import { Resizable } from "re-resizable";
import Loading from "./src/components/Loading";
import { useTaskContext } from "./src/context/TaskContext";
import Editor from "./src/components/Editor";

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
              <Sidebar addButtonRef={addButtonRef} />
            </section>
          </Resizable>

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
            <Editor
              className="global-editor"
              editorRef = {editorRef}
            />
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
