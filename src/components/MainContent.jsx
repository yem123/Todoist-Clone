import { useState, useEffect, useRef } from "react";
import "../styles/mainContent.css";
import ViewButton from "./ViewButton";
import ViewBar from "./ViewBar";
import Today from "./Today";

const MainContent = () => {
  const viewButtonRef = useRef(null);
  const viewBarRef = useRef(null);
  const [isViewBarVisible, setIsViewBarVisible] = useState(false);

  const handleDocumentClick = (event) => {
    viewButtonRef.current &&
    viewBarRef.current &&
    (viewButtonRef.current.contains(event.target) ||
      viewBarRef.current.contains(event.target))
      ? setIsViewBarVisible(true)
      : setIsViewBarVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className="main-contents">
      <section className="today-section no-select">
        <Today />
      </section>
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
    </div>
  );
};

export default MainContent;
