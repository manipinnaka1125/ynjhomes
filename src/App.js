import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import HomePage from "./pages/HomePage";
import Footer from "./pages/Footer";
import Projects from "./pages/Projects";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ERRor from "./pages/ERRor";
import ManageUsers from "./pages/ManageUsers";
import AdminManageProperties from "./pages/AdminManageProperties";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./components/AdminNavBar";
import NavBey from "./components/NavBEy";
import Services from "./pages/servicesss";
import AgentNavbar from "./components/AgentNavbar";
import SellerNavbar from "./components/SellerNavbar";
import PrivateRoute from "./pages/PrivateRoute"; 
import AdminDashboard from "./pages/AdminDashboard"; 
import AgentDashboard from "./pages/AgentDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";

const App = () => (
  <Router>
    <Routes>
      {/* Public routes with Main Navbar and Footer */}
      <Route
        path="/"
        element={
          <>
            <MainNavbar />
            <HomePage />
            <Footer />
          </>
        }
      />
      <Route
        path="/services"
        element={
          <>
            <MainNavbar />
            <Services />
            <Footer />
          </>
        }
      />
      <Route
        path="/projects"
        element={
          <>
            <MainNavbar />
            <Projects />
            <Footer />
          </>
        }
      />
      <Route
        path="/contact-us"
        element={
          <>
            <MainNavbar />
            <ContactUs />
            <Footer />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <MainNavbar />
            <Register />
            <Footer />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <MainNavbar />
            <SignIn />
            <Footer />
          </>
        }
      />
      <Route
        path="*"
        element={<ERRor />}
      />

      {/* Admin routes with Admin Navbar */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <AdminNavbar />
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-manage-users"
        element={
          <PrivateRoute>
            <AdminNavbar />
            <ManageUsers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-manage-properties"
        element={
          <PrivateRoute>
          
            <AdminManageProperties />
          </PrivateRoute>
        }
      />

      {/* Agent Routes */}
      <Route
        path="/agent-dashboard"
        element={
          <PrivateRoute role="agent">
            <AgentNavbar />
            <AgentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/buyer-dashboard"
        element={
          <PrivateRoute role="buyer">
            <NavBey />
            <BuyerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/seller-dashboard"
        element={
          <PrivateRoute role="seller">
            <SellerNavbar />
            <SellerDashboard />
          </PrivateRoute>
        }
      />
    </Routes>

    {/* Toast container for notifications */}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      theme="colored"
      toastStyle={{
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
      }}
    />
  </Router>
);

export default App;
