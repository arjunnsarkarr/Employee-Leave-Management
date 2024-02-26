import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import EmployeeLogin from "../EmployeeLogin/EmployeeLogin";
import AdminLogin from "../AdminLogin/AdminLogin";
import EmployeeHome from "../EmployeeHome/EmployeeHome";
import EmployeeApprovedLeaves from "../EmployeeApprovedLeaves/EmployeeApprovedLeaves";
import EmployeeChangePassword from "../EmployeeChangePassword/EmployeeChangePassword";
import EmployeeLeaveHistory from "../EmployeeLeaveHistory/EmployeeLeaveHistory";
import EmployeeNewLeave from "../EmployeeNewLeave/EmployeeNewLeave";
import EmployeeProfile from "../EmployeeProfile/EmployeeProfile";
import ApplyLeave from "../ApplyLeave/ApplyLeave";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AddDepartment from "../AddDepartment/AddDepartment";
import ManageDepartment from "../ManageDepartment/ManageDepartment";
import AddEmployee from "../AddEmployee/AddEmployee";
import ManageEmployee from "../ManageEmployee/ManageEmployee";
import AddLeaveType from "../AddLeaveType/AddLeaveType";
import ManageLeaveType from "../ManageLeaveType/ManageLeaveType";
import AdminChangePassword from "../AdminChangePassword/AdminChangePassword";
import AllLeave from "../AllLeave/AllLeave";
import ApprovedLeaves from "../ApprovedLeaves/ApprovedLeaves";
import NotApprovedLeaves from "../NotApprovedLeaves/NotApprovedLeaves";
import PendingLeaves from "../PendingLeaves/PendingLeaves";

const DefaultLayout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route path="/EmployeeHome" element={<EmployeeHome />} />
          <Route
            path="/EmployeeApprovedLeaves"
            element={<EmployeeApprovedLeaves />}
          />
          <Route
            path="/EmployeeChangePassword"
            element={<EmployeeChangePassword />}
          />
          <Route
            path="/EmployeeLeaveHistory"
            element={<EmployeeLeaveHistory />}
          />
          <Route path="/EmployeeNewLeave" element={<EmployeeNewLeave />} />
          <Route path="/EmployeeProfile" element={<EmployeeProfile />} />
          <Route path="/ApplyLeave" element={<ApplyLeave />} />

          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AddDepartment" element={<AddDepartment />} />
          <Route path="/ManageDepartment" element={<ManageDepartment />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/ManageEmployee" element={<ManageEmployee />} />
          <Route path="/AddLeaveType" element={<AddLeaveType />} />
          <Route path="/ManageLeaveType" element={<ManageLeaveType />} />
          <Route
            path="/AdminChangePassword"
            element={<AdminChangePassword />}
          />
          <Route path="/AllLeave" element={<AllLeave />} />
          <Route path="/ApprovedLeaves" element={<ApprovedLeaves />} />
          <Route path="/NotApprovedLeaves" element={<NotApprovedLeaves />} />
          <Route path="/PendingLeaves" element={<PendingLeaves />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default DefaultLayout;
