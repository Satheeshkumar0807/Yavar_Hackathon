import React, { useState , useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
const LogoutConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>Are you sure you want to logout?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Logout</Button>
      </DialogActions>
    </Dialog>
  );
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // State for profile Popover
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
    handleCloseMenu();
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    navigate('/login');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    alert('You have been logged out successfully');
    handleCloseConfirmation();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/profile', {
          method: 'GET',
          headers: {
            Authorization: sessionStorage.getItem('token'),
          },
        });
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setProfileOpen(true); // Open profile Popover
  };

  const handleClosePopover = () => {
    setProfileOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1 style={{ fontFamily: 'fantasy', fontWeight: 'bolder', fontSize: 35, color: 'cadetblue', textAlign: 'center', backgroundColor: 'lightgrey', padding: 10, marginTop: 0, height: 50 }}>
        Task Manager
      </h1>
      <Avatar
        sx={{ bgcolor: 'lightblue', position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
        onClick={handleClick}
        src="https://t4.ftcdn.net/jpg/06/76/40/05/240_F_676400584_GjJg8i4M5Ez7kJPWDtKPo7D2XhTO5hUr.jpg"
      />
      <Popover
        open={profileOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{  p: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: 200,
    fontWeight: 'bold' }}>
          Username: {username}
          <br />
          Email: {email}
        </Typography>
      </Popover>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleProfileClick}>Show Profile</MenuItem>
        <MenuItem onClick={handleOpenConfirmation}>Logout</MenuItem>
      </Menu>
      <LogoutConfirmationDialog
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Header;
