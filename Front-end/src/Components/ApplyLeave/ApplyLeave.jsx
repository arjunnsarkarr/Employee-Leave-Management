import React, { useEffect, useState } from "react";
import NavbarEmployee from "../NavbarEmployee/NavbarEmployee";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [allLeaveType, setAllLeaveType] = useState();
  const [leaveType, setLeaveType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const [eid, setEid] = useState("");
  const [name, setName] = useState("");

  const handleTextChange = (event) => {
    const newText = event.target.value;
    if (countWords(newText) < 500) {
      setText(newText);
    }
  };

  const countWords = () => {
    const words = text.trim().split("");
    return words.length;
  };

  // gather data
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
      setEid(result1.employee._id);
      setName(result1.employee.name);
    };
    userApiFunction();
  }, []);

  // For set all departments
  useEffect(() => {
    const getAllDepartment = async () => {
      const result = await fetch(`${domain}/api/leaveType/allLeaveType`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      const data = await result.json();
      setAllLeaveType(data.leavetype);
    };
    getAllDepartment();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/leave/createLeave`, {
        method: "POST",
        headers: {
          authorization: token,
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaveType: leaveType,
          From: from,
          To: to,
          Description: text,
          employeeID: eid,
          employeeName: name,
        }),
      });
      const res = await result.json();
      if (res.message == "Leave Applied") {
        setLeaveType("");
        setFrom("");
        setTo("");
        setText("");
        // toast("Leave Applied Successfully!", {
        //   position: "top-center",
        //   autoClose: 4000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        navigate("/EmployeeHome");
      } else {
        alert("Leave Not Applied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarEmployee />
      <ToastContainer className="mt-15" />

      <form className="container" onSubmit={submitHandler}>
        <h1>Apply For Leave</h1>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Leave Type</label>
          <select
            name=""
            id=""
            className="form-control"
            onChange={(e) => setLeaveType(e.target.value)}
            value={leaveType}
          >
            <option value="" hidden>
              Select Leave Type
            </option>
            {allLeaveType?.map((d, idx) => (
              <option key={idx} value={d.leaveType}>
                {d.leaveType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">From Date</label>
          <input
            type="date"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setFrom(e.target.value)}
            value={from}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">To Date</label>
          <input
            type="date"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setTo(e.target.value)}
            value={to}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
        </div>
        <div className="form-group">
          <textarea
            rows="7"
            style={{ resize: "none", width: "85vw" }}
            onChange={handleTextChange}
            value={text}
          />
          <p>{countWords()}/ 500</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default ApplyLeave;
