import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./assets/store/store.js";
import { Suspense, lazy } from "react";
import { Loader } from "milesuicomponents";
const App = lazy(() => import("./App.jsx"));
const Signup = lazy(() => import("./assets/components/Signup.jsx"));
const Login = lazy(() => import("./assets/components/Login.jsx"));
const ForgotPassword = lazy(() =>
  import("./assets/components/ForgotPassword.jsx")
);
const ResetPassword = lazy(() =>
  import("./assets/components/ResetPassword.jsx")
);
const Dashboard = lazy(() => import("./assets/components/Dashboard.jsx"));
const Products = lazy(() => import("./assets/components/Products.jsx"));
const Overview = lazy(() => import("./assets/components/Overview.jsx"));
const AddProduct = lazy(() => import("./assets/components/AddProduct.jsx"));
const PageNotFound = lazy(() => import("./assets/components/404.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to={"overview"} replace />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="overview" element={<Overview />} />
            </Route>
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  </StrictMode>
);
