import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";



const Login = () => {

  const [loginMode,setLoginMode] = useState(true);

  const [showPassword, setShowPassword] = React.useState(false);

  const [name , setName] = useState("");
  const [email ,setemail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [message,setMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLoginMode = (mode) => {
    setName("");
    setemail("");
    setPassword("");
    setError("");
    setMessage("");
    setLoginMode(mode);
  }

  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios
      .post(
        "http://127.0.0.1:8000/api/login",
        
        {
          headers: {
            Accept: "application/json",
          },
          email: email,
          password: password,

          
        }
      )
      console.log(response);
      if(response.status===200) {
        // localStorage.setItem("token",response.data.access_token);
        // console.log(localStorage.getItem("token"));
        // navigate("/");
        setError("")
        setMessage(response.data.message);
        if(response.data.access_token) {
          localStorage.setItem("token",response.data.access_token);
          console.log(response.data.access_token)
          response.data.is_manager ? localStorage.setItem("is_manager",response.data.is_manager) : "";
          navigate("/")
        }
        
      }
    }
    catch(error){
      console.error('Sign-in error:', error);
      setMessage("");
      setError(error.response.data.message);
    }
  };

  const handleSignupSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios
      .post(
        "http://127.0.0.1:8000/api/register",
        
        {
          headers: {
            Accept: "application/json",
          },
          name: name,
          email: email,
          password: password,
          role_id: 2
          
        }
      )
      console.log(response);
      if(response.status===200) {
        // localStorage.setItem("token",response.data.access_token);
        // console.log(localStorage.getItem("token"));
        // navigate("/");
        setError("")
        setMessage(response.data.message);
        

      }
    }
    catch(error){
      console.error('Sign-up error:', error.response.data);
      setMessage("");
      setError(error.response.data.message);

    }
};
console.log(localStorage.getItem("token"))
console.log(localStorage.getItem("is_manager"))
  return (
    <div className="mainWrap">
      <div className={loginMode===true ? "container loginMode":"container signupMode"}>
        <div className="formContainer">
          <div className="formWrapper">
            <img src={Logo} alt="logo" className="w-52 object-contain"/>
            <div className="user-data flex flex-col gap-9 relative">
              <div>
                <button className={loginMode===true ? "clicked":"not-clicked"}
                  onClick={()=>handleLoginMode(true)}
                  >
                    Login
                </button>
                <button className={loginMode===false ? "clicked ml-8":"not-clicked ml-8"} 
                  onClick={()=>handleLoginMode(false)} 
                  >
                    Sign Up
                </button>
              </div>
            {loginMode &&
            <form className="flex flex-col gap-4 w-72" autoComplete="off"
              onSubmit={handleLoginSubmit}
            >
      
              <TextField
                  label="Email"
                  id="outlined-size-small"
                  size="small"
                  sx={{borderRadius:"7px"}}
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  required
                />
              <FormControl sx={{}} variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{marginRight:"0px"}}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              
              <button type="submit" className="login">Login</button>
            </form>}
            {!loginMode &&
            <form 
              className="flex flex-col mx-auto gap-4 w-72"
              onSubmit={handleSignupSubmit} 
            >
              <TextField
                label="Name"
                id="outlined-size-small"
                size="small"
                sx={{borderRadius:"7px"}}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                />
              <TextField
                label="Email"
                id="outlined-size-small"
                size="small"
                sx={{borderRadius:"7px"}}
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                required
                />

              <FormControl sx={{}} variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{marginRight:"0px"}}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <button className="login">Sign up</button>
            </form>}
            {error && (
                <span className="text-red-600">{error}</span>
              )}
            {message && (
              <span className="text-green-600">{message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
