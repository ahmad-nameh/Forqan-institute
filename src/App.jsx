import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login&register/Login";
import MainInfoArchive from "./components/Archives/MainInfoArchive";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <MainInfoArchive />
      </Router>
      {/* <Login/> */}
      <Home />
    </div>
  );
}

export default App;
