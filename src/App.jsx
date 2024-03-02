import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login&register/Login"
import MainInfoArchive from "./components/Archives/MainInfoArchive";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <MainInfoArchive/>
      </Router>
      {/* <Login/> */}
    </div>
  );
}

export default App;
