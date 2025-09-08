import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Signup from "./assets/components/Signup.jsx";
import Login from "./assets/components/Login.jsx";
import ForgotPassword from "./assets/components/ForgotPassword.jsx";
import ResetPassword from "./assets/components/ResetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resettoken" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
