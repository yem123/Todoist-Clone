import "./app.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/sidebar";
function App() {
  return (
    <>
      <div className="app">
        <section className="side-bar-section no-select">
          <Sidebar />
        </section>
        <section className="main-content-section">
          <MainContent />
        </section>
      </div>
    </>
  );
}

export default App;
