import React, { useEffect, useState } from "react";
import NavbarEmployee from "../NavbarEmployee/NavbarEmployee";
import "./EmployeeHome.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";
import Footer from "../Footer/Footer";


const EmployeeHome = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;
  const [id, setid] = useState();
  const [datta, setData] = useState();

  const [totalLeave, setTotalLeave] = useState("");
  const [newLeave, setNewLeave] = useState("");
  const [approvedLeave, setApprovedLeave] = useState("");

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [tempID, setTempID] = useState("");
  const [user, setuser] = useState({});
  const [particularLeaveCreatedAt, setParticularLeaveCreatedAt] = useState("");
  const [particularLeaveType, setParticularLeaveType] = useState("");
  const [particularLeaveFrom, setParticularLeaveFrom] = useState("");
  const [particularLeaveTo, setParticularLeaveTo] = useState("");
  const [particularLeaveDesc, setParticularLeaveDesc] = useState("");
  const [particularLeaveStatus, setParticularLeaveStatus] = useState("");
  const [particularAdminRemark, setParticularAdminRemark] = useState("");
  const [particularAdminActionDate, setParticularAdminActionDate] =
    useState("");

  // gather id
  useEffect(() => {
    const userApiFunction = async () => {
      const res1 = await fetch(`${domain}/api/employee/employeeHome`, {
        headers: {
          Authorization: `Bearer ${`token`}`,
          token: Cookies.get("token"),
          Accept: "application/json",
        },
        method: "POST",
      });
      const result1 = await res1.json();
      setid(result1.employee._id);
      setuser(result1.employee);
    };
    userApiFunction();
  }, []);

  // for gathering user data
  useEffect(() => {
    const userApiFunction2 = async () => {
      const res2 = await fetch(`${domain}/api/leave/employeeLeave`, {
        method: "POST",
        headers: {
          authorization: token,
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const result2 = await res2.json();
      setTotalLeave(result2.TotalLeave);
      setNewLeave(result2.NewLeaveLength);
      setApprovedLeave(result2.ApprovedLength);
      setData(result2.NewLeaveArray);
    };
    userApiFunction2();
  }, [id]);

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

  return (
    <>
      <NavbarEmployee />
      <div className="cardd">
        <Link
          to="/EmployeeLeaveHistory"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="cardds">
            <h5>Total Leaves</h5>
            <p>{totalLeave}</p>
          </div>
        </Link>
        <Link
          to="/EmployeeApprovedLeaves"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="cardds">
            <h5>Approved Leaves</h5>
            <p>{approvedLeave}</p>
          </div>
        </Link>
        <Link
          to="/EmployeeNewLeave"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="cardds">
            <h5>New Leave Applications</h5>
            <p>{newLeave}</p>
          </div>
        </Link>
      </div>
      <div className="dataTable container mb-5">
        <h4 className="mb-4">LATEST LEAVE APPLICATIONS</h4>
        <hr />
        <DataTable columns={columns} data={datta} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="d-flex flex-column align-items-center"> */}
          <div>
            <p>
              <label>Employee Name</label> {" : "} <span>{user.name}</span>{" "}
            </p>
            <p>
              <label>Employee ID</label> {" : "} <span>{user.EID}</span>{" "}
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
              <span>{particularLeaveStatus}</span>{" "}
            </p>
            <p>
              <label>Admin Remark</label> {" : "}{" "}
              <span>{particularAdminRemark}</span>{" "}
            </p>
            <p>
              <label>Admin Action Taken Date</label> {" : "}{" "}
              {particularLeaveStatus == "Pending" ? (
                "NA"
              ) : (
                <span>{particularAdminActionDate}</span>
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>


      <Footer/>
    </>
  );
};

export default EmployeeHome;
