import { useSidebarContext } from "../context/SidebarContext";
import { useTaskContext } from "../context/TaskContext";
import { isFuture, isToday } from "date-fns";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const { showItems, isSidebarOpen, setIsSidebarOpen, setSidebarWidth } =
    useSidebarContext();
  const { tasks } = useTaskContext();

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

  return (
    <div className="side-bar-contents">
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
          <NavLink
            to="/today"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <li className="today onhover">
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
            <li className="upcoming onhover">
              <div>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <span>Upcoming</span>
              </div>
              <span className="numbers">{upcomingTasks.length}</span>
            </li>
          </NavLink>
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
