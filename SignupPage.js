import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Snackbar , IconButton  } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5%',
    height: 500,
    margin: 'auto',
    width: '45%',
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    border: '3px solid black',
    borderRadius: 10,
  },
  textField: {
    width: '50%',
  },
  link: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: '1rem ',
    textDecoration: 'none', // Remove underline
    color: '#90D3FF',
    '&:hover': {
      fontWeight: 'bold',
    },
  },
}));

const SignupPage = () => {
  const classes = useStyles();
  //const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/tasks');
    }
  }, [navigate]);

  const handleSignup = async () => {
    try {
      // Check if passwords match
      if ( email === '' || username === '' || password === '' || confirmPassword === '') {
        setSnackbarMessage('Please fill all the fields');
        setSnackbarOpen(true);
        return;
      }
      if (password !== confirmPassword) {
        setSnackbarMessage('Passwords do not match');
        setSnackbarOpen(true);
        return;
      }
      // Check email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setSnackbarMessage('Invalid email format');
        setSnackbarOpen(true);
        return;
      }

      // Check password strength
      const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
      if (!strongPasswordRegex.test(password)) {
        setSnackbarMessage('Password must contain at least one lowercase, one uppercase, one symbol, one number, and be at least 8 characters long');
        setSnackbarOpen(true);
        return;
      }

      // Call signup API
      const response = await axios.post('http://localhost:8000/signup', {
        username,
        email,
        password,
      });

      // Redirect to login page on successful signup
      //history.push('/login');
      setSnackbarMessage('Signup Successful');
      setSnackbarOpen(true);
    } catch (error) {
      // Handle signup error
      console.error(error);
      setSnackbarMessage('Signup Failed as username already exists');
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
          fontSize: 30,
          fontWeight: 'bold',
          fontFamily: 'monospace',
        }}
      >
        Sign Up
      </h3>
      <TextField
        style = {{ marginBottom: 10 }}
        className={classes.textField}
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        style = {{ marginBottom: 10 }}
        className={classes.textField}
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
          <TextField
            className={classes.textField}
            style = {{ marginBottom: 10 }}
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
      
          <TextField
            className={classes.textField}
            style = {{ marginBottom: 20 }}
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
      
      <Button
        className={classes.textField}
        variant="contained"
        color="primary"
        onClick={handleSignup}
      >
        Sign Up
      </Button>
      <Link to="/login" className={classes.link} style = {{ }}>
        Back to Login
      </Link>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default SignupPage;
