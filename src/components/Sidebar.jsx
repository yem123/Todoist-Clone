import { useRef } from "react";
import { useSidebarContext } from "../context/SidebarContext";
import { useTaskContext } from "../context/TaskContext";
import { isFuture, isToday } from "date-fns";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({addButtonRef}) => {
  const {
    showItems,
    isSidebarOpen,
    setIsSidebarOpen,
    setSidebarWidth,
    isWindowResized,
  } = useSidebarContext();
  const { tasks, isEditorOpen, setIsClickId, isClickId } = useTaskContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setSidebarWidth(300);
    }
  };

  const todayTasks = tasks.filter((task) =>
      isToday(new Date(task.dateSelected))
  );
  
  const upcomingTasks = tasks.filter((task) =>
    isFuture(new Date(task.dateSelected))
  );

  const handleLinkClick = () => {
    isWindowResized && setIsSidebarOpen(false);
  }

  const handleAddClick = () => {
    setIsClickId("globalEditor");
  };

  return (
    <div className="side-bar-contents">
      <span
        style={{
          pointerEvents:
            isEditorOpen && isClickId === "globalEditor" ? "none" : "auto",
          cursor:
            isEditorOpen && isClickId === "globalEditor"
              ? "default"
              : "pointer",
        }}
      >
        <header className="menu-header">
          <div className="profile onhover">
            <span className="material-symbols-outlined">person_outline</span>
            <span className="username">yemane.measho</span>
            <span className="material-symbols-outlined expand-more">
              expand_more
            </span>
          </div>

          <div className="header-icons">
            <div className="header-notif">
              <span className="material-icons notif-notif">
                access_time_filled
              </span>
              <span className="material-symbols-outlined onhover">
                notifications_none
              </span>
            </div>
            <div
              className="toggle-view"
              onClick={toggleSidebar}
              style={{
                position: "absolute",
                zIndex: 200000,
                right: isSidebarOpen ? "5px" : "-50px",
              }}
            >
              {!isSidebarOpen && (
                <span className="material-icons view-notif">
                  access_time_filled
                </span>
              )}
              <span className="material-symbols-outlined onhover">
                view_sidebar
              </span>
            </div>
          </div>
        </header>
        <section className="menu-add onhover" onClick={handleAddClick} ref={addButtonRef}>
          <span className="material-icons-outlined plus-icon">add_circle</span>
          <span>Add task</span>
        </section>
        <nav
          className="menu"
          style={{
            maxHeight: isWindowResized ? "260px" : "auto",
            overflowY: isWindowResized ? "scroll" : "hidden",
            scrollbarWidth: "thin",
          }}
        >
          <ul className="menu-lists">
            <li className="search onhover">
              <div>
                <span className="material-symbols-outlined">search</span>
                <span>Search</span>
              </div>
            </li>
            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <li className="inbox onhover" onClick={handleLinkClick}>
                <div>
                  <span className="material-symbols-outlined">inbox</span>
                  <span>Inbox</span>
                </div>
                <span className="numbers">{tasks.length}</span>
              </li>
            </NavLink>
            <NavLink
              to="/today"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <li className="today onhover" onClick={handleLinkClick}>
                <div>
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                  <span>Today</span>
                </div>
                <span className="numbers">{todayTasks.length}</span>
              </li>
            </NavLink>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <li className="upcoming onhover" onClick={handleLinkClick}>
                <div>
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                  <span>Upcoming</span>
                </div>
                <span className="numbers">{upcomingTasks.length}</span>
              </li>
            </NavLink>
            <li className="filters onhover" onClick={handleLinkClick}>
              <div>
                <span className="material-symbols-outlined">grid_view</span>
                <span>Filters & Labels</span>
              </div>
            </li>
          </ul>

          <section className="categories">
            <header className="categories-bar onhover">
              <div>Categories</div>
              <div className={` ${showItems ? "show" : "hide"}`}>
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
                <span className="numbers"></span>
              </li>
              <li className="sub-category-contents onhover">
                <div className="sub-category-label">
                  <span className="material-icons-outlined hash">tag</span>
                  <span> Work</span>
                </div>
                <span className="numbers"></span>
              </li>
            </ul>
          </section>
        </nav>
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
      </span>
    </div>
  );
};

export default Sidebar;
