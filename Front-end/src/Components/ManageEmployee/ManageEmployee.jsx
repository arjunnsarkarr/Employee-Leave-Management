import React, { useEffect, useState } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import DataTable from "react-data-table-component";
import Footer from "../Footer/Footer";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ManageEmployee = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;
  const [data, setdata] = useState();
  const [tempID, setTempID] = useState("");
  const [EID, setEID] = useState("");
  const [email, setEmail] = useState("");
  const [empName, setempName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Gender, setGender] = useState("");
  const [Department, setDepartment] = useState("");
  const [City, setCity] = useState("");
  const [Dob, setDob] = useState("");
  const [Address, setAddress] = useState("");
  const [Country, setCountry] = useState("");
  const [allDepartments, setallDepartments] = useState();
  const [bool, setBool] = useState(false);
  const [status, setStatus] = useState();

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);

  // gather leave and all lengths
  useEffect(() => {
    const userApiFunction = async () => {
      const res1 = await fetch(`${domain}/api/employee/allEmployee`, {
        headers: {
          token: Cookies.get("token"),
          Accept: "application/json",
        },
        method: "GET",
      });
      const result1 = await res1.json();
      setdata(result1);
    };
    userApiFunction();
    setBool(false);
    setStatus(true);
  }, [bool,status]);

  const columns = [
    {
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "EID",
      selector: (row) => row.EID,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.Department,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Mode,
      sortable: true,
    },
    {
      name: "Reg Date",
      selector: (row) => row.createdAt.substring(0, 10),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            onClick={DetailsHandler}
            id={row._id}
            className="btn  btn-primary "
          >
            EDIT
          </button>
          {row.Mode === "Active" ? (
            <button
              onClick={inActiveHandler}
              id={row._id}
              className="btn  btn-danger mx-1"
            >
              In Active
            </button>
          ) : (
            <button
              onClick={activeHandler}
              id={row._id}
              className="btn  btn-primary mx-1"
            >
              Active
            </button>
          )}
        </div>
      ),
    },
  ];

  const activeHandler = async (e) => {
    e.preventDefault();
    setStatus(false);
    const result = await fetch(`${domain}/api/employee/employeeStatusChanger`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: e.target.id, Mode: "Active" }),
    });
    const datas = await result.json();
    toast("Employee is now Active !", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const inActiveHandler = async (e) => {
    e.preventDefault();
    setStatus(false);
    const result = await fetch(
      `${domain}/api/employee/employeeStatusChanger `,
      {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: e.target.id, Mode: "InActive" }),
      }
    );
    toast("Employee is Deactivated !", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const [modalShow, setModalShow] = useState(false);
  const DetailsHandler = async (e) => {
    e.preventDefault();
    setTempID(e.target.id);
    setModalShow(true);
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    const res2 = await fetch(`${domain}/api/employee/updateEmployee`, {
      method: "POST",
      headers: {
        authorization: token,
        token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: tempID,
        name: empName,
        Gender: Gender,
        DOB: Dob,
        Department: Department,
        Address: Address,
        City: City,
        Country: Country,
        Mobile: Mobile,
      }),
    });
    const result2 = await res2.json();
    setBool(true);
    setModalShow(false);
  };

  // emp details
  useEffect(() => {
    const userApiFunction2 = async () => {
      const res2 = await fetch(`${domain}/api/employee/employeeDetail`, {
        method: "POST",
        headers: {
          authorization: token,
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: tempID }),
      });
      const result2 = await res2.json();
      setEID(result2.employee.EID);
      setEmail(result2.employee.email);
      setempName(result2.employee.name);
      setMobile(result2.employee.Mobile);
      setGender(result2.employee.Gender);
      setDepartment(result2.employee.Department);
      setCity(result2.employee.City);
      setDob(result2.employee.DOB);
      setAddress(result2.employee.Address);
      setCountry(result2.employee.Country);
    };
    userApiFunction2();
  }, [tempID]);

  // For set all departments
  useEffect(() => {
    const getAllDepartments = async () => {
      const result = await fetch(`${domain}/api/department/allDepartment`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      const data = await result.json();
      setallDepartments(data.department);
    };
    getAllDepartments();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="dataTable container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-4">Manage Employee</h4>
          <input
            type="text"
            //   onChange={FilterHandler}
            placeholder=" Search"
          />
        </div>
        <hr />
        <DataTable columns={columns} data={data} pagination />
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form className="container mt-4">
              <div className="form-group mb-3">
                <label>EID</label>
                <span>
                  {" : "}
                  {EID}{" "}
                </span>
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <span>
                  {" : "}
                  {email}{" "}
                </span>
              </div>
              <div className="form-group mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setempName(e.target.value)}
                  value={empName}
                />
              </div>
              <div className="form-group mb-3">
                <label>Mobile</label>
                <input
                  className="form-control"
                  onChange={(e) => setMobile(e.target.value)}
                  value={Mobile}
                />
              </div>
              <div className="form-group mb-3">
                <label>Gender</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) => setGender(e.target.value)}
                  value={Gender}
                >
                  <option value="Male" className="form-control">
                    Male
                  </option>
                  <option value="Female" className="form-control">
                    Female
                  </option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Department</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) => setDepartment(e.target.value)}
                  value={Department}
                >
                  {allDepartments?.map((d, idx) => (
                    <option key={idx} value={d.DepartmentName}>
                      {d.DepartmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3">
                <label>City/Town</label>
                <input
                  className="form-control"
                  onChange={(e) => setCity(e.target.value)}
                  value={City}
                />
              </div>
              <div className="form-group mb-3">
                <label>DOB</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setDob(e.target.value)}
                  value={Dob}
                />
              </div>
              <div className="form-group mb-3">
                <label>Address</label>
                <input
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  value={Address}
                />
              </div>
              <div className="form-group mb-3">
                <label>Country</label>
                <input
                  className="form-control"
                  onChange={(e) => setCountry(e.target.value)}
                  value={Country}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={modalSubmit}>Submit</Button>
          <Button onClick={() => setModalShow(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default ManageEmployee;
