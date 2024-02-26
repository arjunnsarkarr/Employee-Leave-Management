import React, { useState } from "react";
import "./EmployeeLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const EmployeeLogin = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const token = import.meta.env.VITE_APP_AUTH_TOKEN;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await fetch(`${domain}/api/employee/employeeSignin`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const userr = await result.json();
    if (result.status == 200) {
      if (userr.employee.Mode == "Active") {
        const token = userr.token;
        Cookies.set("token", token, { expires: 1 });
        navigate("/EmployeeHome");
      } else {
        alert("Your account has been deactivated by the Company");
      }
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <section className=" gradient-form" style={{ backgroundColor: "#eee" }}>
          <div>
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <img
                            src="https://flamingoapp.com/wp-content/uploads/2022/06/Leave-Management-System-1240x575.png"
                            style={{
                              width: 185,
                              height: 105,
                              borderRadius: "60%",
                            }}
                            alt="logo"
                          />
                          <h4 className="mt-1 ">Employee Leave Management</h4>
                          <h5>Employee Login</h5>
                          <p className="text-dark">
                            Please Login to your account
                          </p>
                        </div>
                        <form onSubmit={submitHandler}>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="form2Example11"
                            >
                              Email
                            </label>{" "}
                            <input
                              type="email"
                              id="form2Example11"
                              className="form-control"
                              placeholder="Enter Email Address"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="form2Example22"
                            >
                              Password
                            </label>{" "}
                            <input
                              type="password"
                              id="form2Example22"
                              className="form-control"
                              placeholder="Enter Password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <input
                              type="submit"
                              value="Log In"
                              className="btn btn-primary btn-block fa-lg gradient-custom-2  "
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6  d-flex align-items-center gradient-custom-2">
                      <div className="text-white mb-6 px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4">
                          We are more than just a company
                        </h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        <p className="small text-light mb-0">
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeLogin;
