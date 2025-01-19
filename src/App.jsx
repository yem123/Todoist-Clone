import { useState } from "react";
import "./app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
function App() {
  const [showItems, setShowItems] = useState(false);

  return (
    <>
      <div className="app">
        <section
          className="side-bar-section no-select"
          onMouseEnter={() => setShowItems(true)}
          onMouseLeave={() => setShowItems(false)}
        >
          <Sidebar showItems={showItems} />
        </section>
        <section className="main-content-section">
          <MainContent />
        </section>
      </div>
    </>
  );
}

export default App;
