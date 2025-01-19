import "../styles/viewBar.css";

const ViewBar = () => {
  return (
    <div className="view-bar">
      <header className="view-section">
        <h4 className="section-label">View</h4>
        <ul className="view-contents">
          <li className="view-option active">
            <span className="material-symbols-outlined">menu</span>
            <span>List</span>
          </li>
          <li className="view-option onhover">
            <span className="material-symbols-outlined">view_week</span>
            <span>Board</span>
          </li>
          <li className="view-option onhover">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Calendar</span>
          </li>
        </ul>
      </header>

      <section className="sort-section">
        <h4 className="section-label">Sort by</h4>
        <div className="section-content onhover">
          <span className="left-items">
            <span className="material-symbols-outlined">table_view</span>
            <span>Grouping</span>
          </span>
          <span>{`None (default)`}</span>
        </div>
        <div className="section-content onhover">
          <span className="left-items">
            <span className="material-symbols-outlined">swap_vert</span>
            <span>Sorting</span>
          </span>
          <span>{`Smart (default)`}</span>
        </div>
      </section>

      <section className="filter-section">
        <h4 className="section-label">Filter by</h4>
        <ul className="filter-contents">
          <li className="section-content">
            <span className="left-items">
              <span className="material-symbols-outlined">person</span>
              <span>Assignee</span>
            </span>
            <span>Default</span>
          </li>
          <li className="section-content">
            <span className="left-items">
              <span className="material-symbols-outlined">flag</span>
              <span>Priority</span>
            </span>
            <span>{`All (default)`}</span>
          </li>
          <li className="section-content">
            <span className="left-items">
              <span className="material-symbols-outlined">label</span>
              <span>Label</span>
            </span>
            <span>{`All (default)`}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ViewBar;
