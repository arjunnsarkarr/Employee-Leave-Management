import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div id="nav">
        <div className="container-fluid">
          <nav className="navbar navbar-dark">
            <div className="d-flex justify-content-center">
              <h3 className="text-light">ELMS | Employee Leave Management</h3>
            </div>
            <div className="d-flex justify-content-end">
              <div className="d-flex ">
                <Link to="/" className="nav-item nav-link ">
                  Home
                </Link>
                <Link to="/EmployeeLogin" className="nav-item nav-link ">
                  Employee Login
                </Link>
                <Link to="/AdminLogin" className="nav-item nav-link ">
                  Admin Login
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
