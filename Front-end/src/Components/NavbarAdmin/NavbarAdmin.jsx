import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavbarAdmin = () => {
  const navigate = useNavigate();

  const LogoutHandler = (e) => {
    e.preventDefault();
    // localStorage.removeItem("token");
    navigate("/AdminLogin");
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
                <Link to="/AdminDashboard" className="nav-item nav-link ">
                  Dashboard
                </Link>
                <NavDropdown
                  title="Department"
                  id="collapsible-nav-dropdown"
                  className="pt-0 "
                >
                  <NavDropdown.Item>
                    <Link to="/AddDepartment" className="text-dark nav-link ">
                      Add Department
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/ManageDepartment"
                      className="text-dark  nav-link "
                    >
                      Manage Department
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Leave Type"
                  id="collapsible-nav-dropdown"
                  className="pt-0 "
                >
                  <NavDropdown.Item>
                    <Link to="/AddLeaveType" className="text-dark nav-link ">
                      Add Leave Type
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/ManageLeaveType"
                      className="text-dark  nav-link "
                    >
                      Manage Leave Type
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Employee"
                  id="collapsible-nav-dropdown"
                  className="pt-0 "
                >
                  <NavDropdown.Item>
                    <Link to="/AddEmployee" className="text-dark nav-link ">
                      Add Employee
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/ManageEmployee"
                      className="text-dark  nav-link "
                    >
                      Manage Employee
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Leave Management"
                  id="collapsible-nav-dropdown"
                  className="pt-0 "
                >
                  <NavDropdown.Item>
                    <Link to="/AllLeave" className="text-dark nav-link ">
                      All Leaves
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/PendingLeaves"
                      className="text-dark  nav-link "
                    >
                      Pending Leaves
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/ApprovedLeaves"
                      className="text-dark  nav-link "
                    >
                      Approved Leaves
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/NotApprovedLeaves"
                      className="text-dark  nav-link "
                    >
                      Not Approved Leaves
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Link
                  to="/AdminChangePassword"
                  className="nav-item nav-link "
                >
                  Change Password
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

export default NavbarAdmin;
