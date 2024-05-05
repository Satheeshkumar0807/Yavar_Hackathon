import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import StatsBarChart from './StatsBarChart';

const StatsDialog = ({ open, onClose, stats }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Statistics</DialogTitle>
      <DialogContent>
        <StatsBarChart stats={stats} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatsDialog;
