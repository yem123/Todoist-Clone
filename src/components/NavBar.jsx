import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const NavBar = () => {

  return (
    <div className="navbar-contents">
      <NavLink
        to="/today"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        <div className="today-navbar items">
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="items-label">Today</span>
        </div>
      </NavLink>
      <NavLink
        to="/upcoming"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        <div className="upcoming-navbar items">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="items-label">Upcoming</span>
        </div>
      </NavLink>
      <NavLink
        to="/inbox"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        <div className="inbox-navbar items">
          <span className="material-symbols-outlined">inbox</span>
          <span className="items-label">Inbox</span>
        </div>
      </NavLink>
      <NavLink
        to=""
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        <div className="navbar-button items">
          <span className="material-symbols-outlined">menu</span>
          <span className="items-label">Browse</span>
        </div>
      </NavLink>
    </div>
  );
};

export default NavBar;
