

import React, { useState , useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, IconButton, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {Link , useNavigate } from 'react-router-dom';

import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5%',
    height: 500,
    margin: 'auto',
    width: '45%',
    justifyContent: 'center',
    border: '3px solid black',
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '80%', // Adjust width for smaller screens
    },
  },
  textField: {
    width: '50%', // Make text fields take full width
    marginBottom: theme.spacing(2),
  },
  link : {
    marginTop: 20,
    textDecoration: 'none', // Remove underline
    color: '#90D3FF',
    '&:hover': {
      fontWeight: 'bold',
    },
  },
  
}));

const LoginPage = () => {

  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/tasks');
    }
  }, [navigate]);


  const handleLogin = async () => {
    try {
      if (  username === '' || password === '') {
        setSnackbarMessage('Please fill all the fields');
        setSnackbarOpen(true);
        return;
      }
      console.log(username, password);
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      const { token } = response.data;
      console.log(token);
      sessionStorage.setItem('token', token);
      setSnackbarMessage('Login Successful');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate('/tasks');
    } catch (error) {
      setSnackbarMessage('Login Failed');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      <h3
        style={{
          marginBottom: 30,
          color: 'black',
          fontSize: 50,
          fontWeight: 'bold',
          fontFamily: 'monospace',
        }}
      >
        Login
      </h3>
        
          <TextField
            style = {{ marginBottom: 10 }}
            className={classes.textField}
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
        
          <TextField
            style = {{ marginBottom: 20 }}
            className={classes.textField}
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        
        
          <Button
            className={classes.textField}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to="/signup" className={classes.link} >
              Create an account
          </Link>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      
    </div>
  );
};

export default LoginPage;
