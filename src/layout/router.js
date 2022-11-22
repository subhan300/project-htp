import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/private-routing/private-routing";
import { ApplicationLayout } from "./index";
import {
  ResetPassword,
  OTP,
  SignIn,
  SignUp,
  Dashboard,
  ForgetPassword,
} from "../modules";

export const MainRouting = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/htp/*"
            element={
              <PrivateRoute>
                <ApplicationLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
