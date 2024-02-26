import React, { useEffect, useState } from "react";
import NavbarEmployee from "../NavbarEmployee/NavbarEmployee";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeProfile = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;

  const [eid, setEid] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [mode, setMode] = useState("");

  const [allDepartment, setallDepartment] = useState();

  // For set all departments
  useEffect(() => {
    const getAllDepartment = async () => {
      const result = await fetch(`${domain}/api/department/allDepartment`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      const data = await result.json();
      setallDepartment(data.department);
    };
    getAllDepartment();
  }, []);

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
      setId(result1.employee._id);
      setEid(result1.employee.EID);
      setEmail(result1.employee.email);
      setName(result1.employee.name);
      setMobile(result1.employee.Mobile);
      setGender(result1.employee.Gender);
      setDepartment(result1.employee.Department);
      setCity(result1.employee.City);
      setDate(result1.employee.DOB);
      setAddress(result1.employee.Address);
      setCountry(result1.employee.Country);
      setMode(result1.employee.Mode);
    };
    userApiFunction();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/employee/updateEmployee`, {
        method: "POST",
        headers: {
          authorization: token,
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          name: name,
          Gender: gender,
          DOB: date,
          Department: department,
          Address: address,
          City: city,
          Country: country,
          Mobile: mobile,
          Mode: mode,
        }),
      });
      const res = await result.json();
      if ((res.message = "Employee Updated")) {
        toast("Details Updated Successfully !", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (res.message == 204) {
        alert("Current Password Not Matched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarEmployee />
      <ToastContainer className="mt-15" />
      <form className="container mt-4" onSubmit={submitHandler}>
        <h1>Employee Profile</h1>

        <div className="form-group mb-3">
          <label>Employee ID</label>
          <span> : {eid}</span>
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <span> : {email}</span>
        </div>

        <div className="form-group mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group mb-3">
          <label>Mobile</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        <div className="form-group mb-3">
          <label>Gender</label>
          <select
            className="form-control"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="Male" className="form-control">
              Male
            </option>
            <option value="Female" className="form-control">
              Female
            </option>
            <option value="Other" className="form-control">
              other
            </option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Department</label>
          <select
            className="form-control"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
          >
            {allDepartment?.map((d, idx) => (
              <option key={idx} value={d.DepartmentName}>
                {d.DepartmentName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label>City/Town</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div className="form-group mb-3">
          <label>Date Of Birth</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
        <div className="form-group mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="form-group mb-3">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </div>

        <button type="submit" name="create" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default EmployeeProfile;
