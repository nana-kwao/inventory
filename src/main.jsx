import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./assets/store/store.js";
import App from "./App.jsx";
import Signup from "./assets/components/Signup.jsx";
import Login from "./assets/components/Login.jsx";
import ForgotPassword from "./assets/components/ForgotPassword.jsx";
import ResetPassword from "./assets/components/ResetPassword.jsx";
import Dashboard from "./assets/components/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
