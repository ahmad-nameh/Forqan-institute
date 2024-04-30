import React from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login&register/Login";
import MainInfoArchive from "./components/Archives/pages/MainInfoArchive";
import SubInfoArchive from "./components/Archives/pages/SubInfoAchive";
import SubInfoArchivePart2 from "./components/Archives/pages/SubInfoArchivePart2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ShowInfo from "./components/TableShow/ShowInfo";
import ShowInfo2 from "./components/TableShow/ShowInfo2";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route
            path="/archive"
            element={<PrivateRoute element={MainInfoArchive} />}
          />
          <Route
            path="/archive/part2"
            element={<PrivateRoute element={SubInfoArchive} />}
          />
          <Route
            path="/archive/part3"
            element={<PrivateRoute element={SubInfoArchivePart2} />}
          />
          <Route
            path="/showInfo"
            element={<PrivateRoute element={ShowInfo} />}
          />
          <Route
            path="/showInfo2"
            element={<PrivateRoute element={ShowInfo2} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
