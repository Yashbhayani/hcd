import React, { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Homecontex from "../Context/Home/HomeContext";

const Navebar = () => {
  const context = useContext(Homecontex);
  const { UserINFO } = context;
  let location = useLocation();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    UserINFO.ActiveUser = false
    navigate("/login");
  };
  return (
    // fixed-top
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: "blue",
            fontFamily: '"Arizonia"',
            fontSize: "2em",
            textShadow: "2px 2px 5px red, 0 0 5px white, 0 0 5px darkblue",
            fontWeight: "bold",
          }}
        >
          HCD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/alldata" ? "active" : ""
                }`}
                to="/alldata"
              >
                All Data
              </Link>
            </li>
            {localStorage.getItem("token")
              ? UserINFO.ActiveUser && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/readfeedback" ? "active" : ""
                      }`}
                      to="/readfeedback"
                    >
                      Read Feedback
                    </Link>
                  </li>
                )
              : ""}
          </ul>
          <div className="d-flex me-2">
            <ul className="nav justify-content-end">
              {localStorage.getItem("token") ? (
                <>
                  <li>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/profile" ? "active" : ""
                      }`}
                      to="/profile"
                    >
                      {UserINFO.Firstname} {UserINFO.Lastname}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="btn btn-outline-danger"
                      aria-current="page"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="p-2">
                    <Link
                      to="/signup"
                      className={`btn btn-outline-info nav-link ${
                        location.pathname === "/signup" ? "active" : ""
                      }`}
                      aria-current="page"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/login"
                      className={`btn btn-outline-info nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navebar;
