import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../../website/pages/Login/login.css";
import "./login.css";
import Logo from "../../assets/Logo.png";
// import { useSignIn } from "react-auth-kit";
// import axios from "axios";

// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// export default function BasicTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <TextField id="filled-basic" label="Filled" variant="filled" />
//       <TextField id="standard-basic" label="Standard" variant="standard" />
//     </Box>
//   );
// }

const Login = () => {
  let [err, seterr] = useState({});
  if (err.data) {
    setTimeout(() => {
      seterr({});
    }, 5000);
  }

  const [loginMode,setLoginMode] = useState(true);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
//   const signIn = useSignIn();
//   const navigate = useNavigate();

  const handelSubmit = async (e) => {
    //لمنع تحديث الصفحة عند الارسال
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

  //   const response = await axios
  //     .post(
  //       "http://127.0.0.1:8000/api/admin/login",

  //       {
  //         headers: {
  //           Accept: "application/json",
  //         },
  //         user_name: email,
  //         password: password,
  //       }
  //     )
  //     .catch((errr) => {
  //       seterr(errr.response);
  //     });
  //   if (
  //     signIn({
  //       token: response.data.admin.token,
  //       expiresIn: 50000,
  //       tokenType: response.data.admin.admin_type,
  //       authState: response.data.admin.user_name,
  //     })
  //   ) 
  };
  return (
    <div className="mainWrap">
      <div className={loginMode===true ? "container loginM":"container signup"}>
        <div className="formContainer">
          <div className="formWrapper" style={{display:"flex"}}>
              <img src={Logo} alt="" style={{width:"200px",objectFit:"contain"}}/>
            <div style={{display:"flex",flexDirection:"column",gap:"35px"}} className="user-pass">
              <div>
            <button className={loginMode===true ? "clicked":"not-clicked"}onClick={()=>setLoginMode(true)}>Login</button>
            <button className={loginMode===false ? "clicked":"not-clicked"} onClick={()=>setLoginMode(false)} style={{marginLeft:"30px"}}>Sign Up</button>
            </div>
            {loginMode &&
            <form onSubmit={handelSubmit} style={{display:"flex",flexDirection:"column",gap:"20px",width:"300px",margin:"auto"}}>
              {/* <input type="text" placeholder="Username"/> */}
              {/* <Box
      component="form"
      sx={{
        '& > :not(style)': {  },
      }}
      noValidate
      autoComplete="off"
      size="small"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /> */}

<Box
      component="form"
      sx={{
        
        '& .MuiTextField-root': {width:"100%"},
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{borderRadius:"7px"}}>
        <TextField
          label="Size"
          id="outlined-size-small"
          // defaultValue="Small"
          size="small"
          sx={{borderRadius:"7px"}}
        />
        
      </div>
      
    </Box>
    <FormControl sx={{}} variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            // color="success"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
              {/* <input type="password" placeholder="Password" /> */}
              {err.data && (
                <span style={{ color: "red" }}>{err.data.message}</span>
              )}
              {/* <a href="#/">Forgot password?</a> */}
            </form>}

            {!loginMode &&
            <form onSubmit={handelSubmit} style={{display:"flex",flexDirection:"column",gap:"20px",width:"300px",margin:"auto"}}>
              {/* <input type="text" placeholder="Username"/> */}
              {/* <Box
      component="form"
      sx={{
        '& > :not(style)': {  },
      }}
      noValidate
      autoComplete="off"
      size="small"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /> */}

<Box
      component="form"
      sx={{
        
        '& .MuiTextField-root': {width:"100%"},
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          label="Size"
          id="outlined-size-small"
          // defaultValue="Small"
          size="small"
        />
        
        
      
    </Box>
    <Box
      component="form"
      sx={{
        
        '& .MuiTextField-root': {width:"100%"},
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          label="Size"
          id="outlined-size-small"
          // defaultValue="Small"
          size="small"
        />
        
        
      
    </Box>
    <Box
      component="form"
      sx={{
        
        '& .MuiTextField-root': {width:"100%"},
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          label="Size"
          id="outlined-size-small"
          // defaultValue="Small"
          size="small"
        />
        
        
      
    </Box>
    <FormControl sx={{  }} variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            // color="success"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{  }} variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            // color="success"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
              {/* <input type="password" placeholder="Password" /> */}
              {err.data && (
                <span style={{ color: "red" }}>{err.data.message}</span>
              )}
              {/* <a href="#/">Forgot password?</a> */}
            </form>}
            <button className="login">Login</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
