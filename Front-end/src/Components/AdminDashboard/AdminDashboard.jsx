import React, { useEffect, useState } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;

  const [datta, setData] = useState();
  const [empLength, setEmpLength] = useState("");
  const [departmentLength, setDepartmentLength] = useState("");
  const [leaveTypeLength, setLeaveTypeLength] = useState("");
  const [AllLeaveLength, setAllLeaveLength] = useState("");
  const [ApprovedLength, setApprovedLength] = useState("");
  const [NewLeaveLength, setNewLeaveLength] = useState("");

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [tempID, setTempID] = useState("");
  const [particularLeaveCreatedAt, setParticularLeaveCreatedAt] = useState("");
  const [particularLeaveType, setParticularLeaveType] = useState("");
  const [particularLeaveFrom, setParticularLeaveFrom] = useState("");
  const [particularLeaveTo, setParticularLeaveTo] = useState("");
  const [particularLeaveDesc, setParticularLeaveDesc] = useState("");
  const [particularLeaveStatus, setParticularLeaveStatus] = useState("");
  const [particularAdminRemark, setParticularAdminRemark] = useState("");
  const [particularAdminActionDate, setParticularAdminActionDate] =
    useState("");
  const [empName, setEmpName] = useState("");

  // gather leave and all lengths
  useEffect(() => {
    const userApiFunction = async () => {
      const res1 = await fetch(`${domain}/api/leave/LeaveData`, {
        headers: {
          token: Cookies.get("token"),
          Accept: "application/json",
        },
        method: "GET",
      });
      const result1 = await res1.json();
      console.log(result1, "result h");
      setEmpLength(result1.AllEmployeeLength);
      setDepartmentLength(result1.AllDepartmentLength);
      setLeaveTypeLength(result1.AllLeaveTypeLength);
      setAllLeaveLength(result1.AllLeaveLength);
      setApprovedLength(result1.ApprovedLength);
      setNewLeaveLength(result1.NewLeaveLength);
      setData(result1.NewLeaveArray);
    };
    userApiFunction();
  }, []);

  // for gathering particular leave data
  useEffect(() => {
    const userApiFunction2 = async () => {
      const res2 = await fetch(`${domain}/api/leave/LeaveDetail`, {
        method: "POST",
        headers: {
          authorization: token,
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: tempID }),
      });
      const result2 = await res2.json();
      setParticularLeaveCreatedAt(result2.leave.createdAt.substring(0, 10));
      setParticularLeaveType(result2.leave.leaveType);
      setParticularLeaveFrom(result2.leave.From);
      setParticularLeaveTo(result2.leave.To);
      setParticularLeaveDesc(result2.leave.Description);
      setParticularLeaveStatus(result2.leave.leaveStatus);
      setParticularAdminRemark(result2.leave.AdminRemark);
      setParticularAdminActionDate(result2.leave.updatedAt.substring(0, 10));
      setEmpName(result2.leave.employeeName);
    };
    userApiFunction2();
  }, [tempID]);

  const columns = [
    {
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "Employe Name	",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Leave Type		",
      selector: (row) => row.leaveType,
      sortable: true,
    },
    {
      name: "Posting Date	",
      selector: (row) => row.createdAt.substring(0, 10),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.leaveStatus,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            onClick={DetailsHandler}
            id={row._id}
            className="btn  btn-primary mx-1"
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  const DetailsHandler = async (e) => {
    e.preventDefault();
    setTempID(e.target.id);
    setShow(true);
  };


  const adminActionHandler = async (e)=>{
    e.preventDefault();


  }


  return (
    <>
      <NavbarAdmin />
      <div className="container ">
        <div className="cardd">
          <Link
            to="/ManageEmployee"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="cardds">
              <h5>Total Regd Employee</h5>
              <p>{empLength}</p>
            </div>
          </Link>
          <Link
            to="/ManageDepartment"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="cardds">
              <h5>Listed Departments</h5>
              <p>{departmentLength}</p>
            </div>
          </Link>
          <Link
            to="/ManageLeaveType"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="cardds">
              <h5>Listed Leave Types</h5>
              <p>{leaveTypeLength}</p>
            </div>
          </Link>
        </div>
        <div className="cardd">
          <Link
            to="/AllLeave"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="cardds">
              <h5>Total Leaves</h5>
              <p>{AllLeaveLength}</p>
            </div>
          </Link>
          <Link
            to="/ApprovedLeaves"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="cardds">
              <h5>Approved Leaves</h5>
              <p>{ApprovedLength}</p>
            </div>
          </Link>
          <Link
            to="/PendingLeaves"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="cardds">
              <h5>New Leave Applications</h5>
              <p>{NewLeaveLength}</p>
            </div>
          </Link>
        </div>

        <div className="dataTable container mb-5">
          <h4 className="mb-4">LATEST LEAVE APPLICATIONS</h4>
          <hr />
          <DataTable columns={columns} data={datta} />
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Leave Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="d-flex flex-column align-items-center"> */}
          <div>
            <p>
              <label>Employee Name</label> {" : "} <span>{empName}</span>{" "}
            </p>
            <p>
              {/* <label>Employee ID</label> {" : "} <span>{user.EID}</span>{" "} */}
            </p>
            <p>
              <label>Posting Date</label> {" : "}{" "}
              <span>{particularLeaveCreatedAt}</span>{" "}
            </p>
            <p>
              <label>Leave Type</label> {" : "}{" "}
              <span>{particularLeaveType}</span>{" "}
            </p>
            <p>
              <label>From</label> {" : "} <span>{particularLeaveFrom}</span>{" "}
            </p>
            <p>
              <label>To</label> {" : "} <span>{particularLeaveTo}</span>{" "}
            </p>
            <p>
              <label>Description</label> {" : "}{" "}
              <span>{particularLeaveDesc}</span>{" "}
            </p>
            <p>
              <label>Leave Status</label> {" : "}{" "}
              {particularLeaveStatus == "Pending" ? (
                "Waiting For Approval"
              ) : (
                <span>{particularLeaveStatus}</span>
              )}
            </p>
            <p>
              {particularLeaveStatus == "Pending" ? (
                <div>
                  <form onSubmit={adminActionHandler}>
                    <div className="form-group mb-3">
                      <label>Admin Remark</label> {" : "}{" "}
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setParticularAdminRemark(e.target.value)
                        }
                        value={particularAdminRemark}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Admin Action Taken Date</label> {" : "}{" "}
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setParticularAdminActionDate(e.target.value)
                        }
                        value={particularAdminActionDate}
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                  </form>
                </div>
              ) : (
                <div>
                  <span>{particularAdminRemark}</span>
                </div>
              )}
            </p>
            <p>
              <label>Admin Remark</label> {" : "}{" "}
              <span>{particularAdminRemark}</span>
            </p>
            <p>
              <label>Admin Action Taken Date</label> {" : "}{" "}
              <span>{particularAdminActionDate}</span>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default AdminDashboard;
