import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';



const Login = () => {
  const [login,setLogin]=useState({
    Username:"",
    Password:""
  });
  const [error,setError]=useState(false);
  const navigate=useNavigate()
  const data=useAuth();
  const handleData=(e:ChangeEvent<HTMLInputElement>)=>
  {
    const{value,name}=e.target;
    setLogin({...login,[name]:value});
  }
  const valid=()=>
  {
     return login.Username!==""&&login.Password !=="";
  }
  const passwordValidation=()=>
  {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(login.Password);
  }
  const handleLogin=()=>
  {
     if(valid())
     {
        if(passwordValidation())
        {
          const user=login.Username
           data?.login(user)
           navigate("/main")
        }
        setError(true)
     }
     setError(true);
  }
  return (<Container  maxWidth="xs" style={{margin:" 141px auto"}}>
  <Box
    boxShadow={3}
    bgcolor="white"
    p={3}
    borderRadius={8}
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Typography variant="h5">Login</Typography>
    <form style={{ width: '100%' }}>
      <TextField
        name="Username"
        label="Username"
        type="text"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={login.Username}
        onChange={handleData}
        
      />
      {
        error && login.Username ==="" &&<span style={{"color":"red"}}>Username required</span>
      }
      <TextField
        name="Password"
        label="Password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="password"
        value={login.Password}
        onChange={handleData}
      />
       {
        error && login.Password ==="" ? <span style={{"color":"red"}}>password required</span>:
        error && !passwordValidation()&& <span style={{"color":"red"}}>password should be 8 characters</span>
      }
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        style={{ marginTop: '20px' }} onClick={handleLogin}
      >
        Log In
      </Button>
    </form>
  </Box>
</Container>
    );
}

export default Login