import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login&register/Login";
import MainInfoArchive from "./components/Archives/MainInfoArchive";
import {  BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from "./Home";

function App() {
  return (
    <div >
      
      {/* <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/archive" element={<MainInfoArchive/>} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter> */}

{/* <div> */}
    <BrowserRouter>
          {/* Render NavBar for all routes except /login */}
          {/* <Route path="/*" element={<NavBar />} /> */}
    <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<MainInfoArchive />} />
            {/* Do not render NavBar on the Login page */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
