import "../styles/sidebar.css";
const Sidebar = ({ showItems }) => {
  return (
    <div className="side-bar-contents">
      <header className="menu-header">
        <div className="profile onhover">
          <span className="material-symbols-outlined">person_outline</span>
          <span className="username">yemane.measho</span>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
        <div className="header-right-icons">
          <span className="material-symbols-outlined onhover">
            notifications_none
          </span>
          <span className="material-symbols-outlined onhover">
            view_sidebar
          </span>
        </div>
      </header>
      <section className="menu-add onhover">
        <span className="material-icons-outlined plus-icon">add_circle</span>
        <span>Add task</span>
      </section>
      <nav className="menu">
        <ul className="menu-lists">
          <li className="search onhover">
            <div>
              <span className="material-symbols-outlined">search</span>
              <span>Search</span>
            </div>
          </li>
          <li className="inbox onhover">
            <div>
              <span className="material-symbols-outlined">inbox</span>
              <span>Inbox</span>
            </div>
          </li>
          <li className="today onhover">
            <div>
              <span className="material-symbols-outlined">calendar_today</span>
              <span>Today</span>
            </div>
            <span className="numbers">2</span>
          </li>
          <li className="upcoming onhover">
            <div>
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Upcoming</span>
            </div>
          </li>
          <li className="filters onhover">
            <div>
              <span className="material-symbols-outlined">grid_view</span>
              <span>Filters & Labels</span>
            </div>
          </li>
        </ul>

        <section className="categories">
          <header className="categories-bar onhover">
            <div>Categories</div>
            <div className={` ${showItems ? "show-me" : "hide-me"}`}>
              <span className="material-symbols-outlined">add</span>
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </header>
          <ul className="sub-category">
            <li className="sub-category-contents onhover">
              <div className="sub-category-label">
                <span className="material-icons-outlined hash">tag</span>
                <span>Grocery-List</span>
              </div>
              <span className="numbers">11</span>
            </li>
            <li className="sub-category-contents onhover">
              <div className="sub-category-label">
                <span className="material-icons-outlined hash">tag</span>
                <span> Work</span>
              </div>
              <span className="numbers">5</span>
            </li>
          </ul>
        </section>

        <section className="features">
          <div className="add-team onhover">
            <span className="material-symbols-outlined">add</span>
            <span>Add a team</span>
          </div>
          <div className="browse-templates onhover">
            <span className="material-symbols-outlined">palette</span>
            <span>Browse Templates</span>
          </div>
        </section>
      </nav>
    </div>
  );
};

export default Sidebar;
