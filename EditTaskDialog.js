import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from './DatePicker'; // Import the DatePicker component

const EditTaskDialog = ({ open, onClose, task, onSaveChanges }) => {
  const [editedTask, setEditedTask] = useState(task);

  // Update editedTask state when task prop changes
  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  // Handle changes in editedTask
  const handleTaskNameChange = (e) => {
    setEditedTask({ ...editedTask, task_name: e.target.value });
  };

  const handleTaskDescriptionChange = (e) => {
    setEditedTask({ ...editedTask, task_description: e.target.value });
  };

  const handleStatusChange = (e) => {
    setEditedTask({ ...editedTask, status: e.target.checked });
  };

  const handleStartDateChange = (date) => {
    setEditedTask({ ...editedTask, task_start_date: date });
  };

  const handleEndDateChange = (date) => {
    setEditedTask({ ...editedTask, task_end_date: date });
  };

  const handleSaveChangesClick = () => {
    onSaveChanges(editedTask);
  };

  // Render the dialog content
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        {/* Check if task is not null before accessing its properties */}
        {editedTask && (
          <>
            <TextField
              label="Task Name"
              value={editedTask.task_name}
              onChange={handleTaskNameChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Task Description"
              value={editedTask.task_description}
              onChange={handleTaskDescriptionChange}
              fullWidth
              margin="dense"
              multiline
              rows={4}
            />
            <FormControlLabel
              control={<Checkbox checked={editedTask.status} onChange={handleStatusChange} />}
              label="Status"
            />
            <DatePicker
              label="Start Date"
              value={editedTask.task_start_date}
              onChange={handleStartDateChange}
            />
            <DatePicker
              label="End Date"
              value={editedTask.task_end_date}
              onChange={handleEndDateChange}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveChangesClick}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
