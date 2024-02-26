import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarEmployee.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";

const NavbarEmployee = () => {
  const navigate = useNavigate();

  const LogoutHandler = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    navigate("/EmployeeLogin");
  };

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
                <Link to="/EmployeeHome" className="nav-item nav-link ">
                  Dashboard
                </Link>
                <NavDropdown
                  title="Leaves"
                  id="collapsible-nav-dropdown"
                  className="pt-0 "
                >
                  <NavDropdown.Item>
                    <Link to="/ApplyLeave" className="text-dark nav-link ">
                      Apply Leave
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/EmployeeLeaveHistory"
                      className="text-dark  nav-link "
                    >
                      Leave History
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Link
                  to="/EmployeeChangePassword"
                  className="nav-item nav-link "
                >
                  Change Password
                </Link>
                <Link to="/EmployeeProfile" className="nav-item nav-link ">
                  My Profile
                </Link>
                <button
                  className="nav-link  bn632-hover bn28"
                  onClick={LogoutHandler}
                >
                  SIGN OUT
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarEmployee;
