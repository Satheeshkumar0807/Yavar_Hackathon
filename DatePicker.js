import React from 'react';
import TextField from '@mui/material/TextField';

const DatePicker = ({ label, value, onChange }) => {
  
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={handleChange}
      fullWidth
      margin="dense"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DatePicker;
