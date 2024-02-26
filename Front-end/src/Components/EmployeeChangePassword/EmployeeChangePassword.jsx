import React, { useEffect, useState } from "react";
import NavbarEmployee from "../NavbarEmployee/NavbarEmployee";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const EmployeeChangePassword = () => {

  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;

  const [password, setpassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [id, setid] = useState();

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
    };
    userApiFunction();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/employee/changePassword`, {
        method: "POST",
        headers: {
          authorization: token,
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          oldPassword: currentPassword,
          newPassword: password,
        }),
      });
      const res = await result.json();
      if (res.message == 200) {
        setConfirmPassword("");
        setpassword("");
        setCurrentPassword("");
        toast("Password Changed Successfully !", {
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

  // password check methods
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    var passwordInput = document.getElementById("password");
    var showPasswordCheckbox = document.getElementById("showPassword");
    passwordInput.type = showPasswordCheckbox.type ? "text" : "password";
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };

  const [showPasswordd, setShowPasswordd] = useState(false);
  const togglePasswordVisibilityy = (userId) => {
    setShowPasswordd((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      <NavbarEmployee />
      <ToastContainer className="mt-15" />
      <form onSubmit={submitHandler} className="container mt-4">
        <h1>Change Password</h1>
        <div className="form-group mb-3">
          <label>Current Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            placeholder="Current Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
          />
        </div>
        <div className="form-group mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="New Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <div className="form-group mb-3">
          <label>Confirm New Password</label>
          <input
            type={showPasswordd[confirmPassword] ? "text" : "password"}
            placeholder="Re-Enter New Password"
            className="form-control"
            required
            id="confirmPassword"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          <div>
            {!passwordsMatch && (
              <p style={{ color: "red" }}>Passwords do not match</p>
            )}
            <button
              onClick={() => togglePasswordVisibilityy(confirmPassword)}
              id="showPassword"
              style={{
                textDecoration: "none",
                border: "none",
                backgroundColor: "inherit",
              }}
            >
              Show Password
            </button>
          </div>
        </div>
        {passwordsMatch && (
          <button type="submit" name="create" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
    </>
  );
};

export default EmployeeChangePassword;
