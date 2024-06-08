import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/menu.css';
function Menu() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div>
        <div id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/watchlist"
                className={location.pathname === "/watchlist" ? "active" : ""}
              >
                Watchlist
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;