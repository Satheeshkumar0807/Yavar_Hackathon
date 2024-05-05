import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Snackbar , TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';


import AnalyticsIcon from '@mui/icons-material/Analytics';
import StatsDialog from './StatsDialog';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Adapter for DatePicker
import { DatePicker }  from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Header from './HeaderPage';

import EditTaskDialog from './EditTaskDialog';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [deleteopen, setdeleteOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    //Stats Dialog
    const [statsDialogOpen, setStatsDialogOpen] = useState(false);
    const [stats, setStats] = useState(null); // This state will hold the statistics data

    //Edit

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTask, setEditedTask] = useState(null);


    const handleEditClick = (task) => {
        setEditedTask(task);
        setEditDialogOpen(true);
      };
    
      const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
      };
    
      const handleSaveChanges = (editedTask) => {
        // Handle saving changes here
        console.log('Edited Task:', editedTask);
        alert('Task edited successfully')
        handleEditTask(editedTask);
        
        setEditDialogOpen(false); 
      };

    
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token does not exist
            return; // Exit useEffect
        }

        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8000/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token // Use token here
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data['tasks']);
                setFilteredTasks(data['tasks']);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchTasks();
    }, [navigate]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


      // Charts Dialog

      
    
      // Dummy statistics data for demonstration
      const handleStatsClickOpen = async () => {
        try {
          const response = await fetch('http://localhost:8000/stats', {
            method: 'GET',
            headers: {
              'Authorization': sessionStorage.getItem('token')
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch statistics');
          }
    
          const data = await response.json();
          setStats(data);
          setStatsDialogOpen(true);
        } catch (error) {
          console.error('Error fetching statistics:', error);
        }
      };
    
      const handleCloseStatsDialog = () => {
        setStatsDialogOpen(false);
      };



      // End Charts Dialog



    const handleAddTask = async () => {
        try {
            if (!taskName || !taskDescription || !startDate || !endDate) {
                
                setSnackbarMessage('Please fill all fields');
                setSnackbarOpen(true);
                return ;

              }
              console.log(taskName, taskDescription, startDate, endDate, status)
              if (startDate > endDate) {
        
                setSnackbarMessage('End date must be greater than or equal to start date');
                setSnackbarOpen(true);
                return ;
              }
              let ls1 = startDate['$d']
              let ls2 = endDate['$d']
              const ls_s1 =  ls1.getFullYear().toString() + '-'+ls1.getMonth().toString()+'-'+ls1.getDate().toString();   
              const ls_s2 = ls2.getFullYear().toString() + '-'+ls2.getMonth().toString()+'-'+ls2.getDate().toString();
              console.log(ls_s1,ls_s2);
              const task = {
                task_name: taskName,
                task_description: taskDescription,
                task_start_date: ls_s1,
                task_end_date: ls_s2,
                status: status
            };
            console.log(task);
            
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ task }),
            });

            const data = await response.json();
            setTasks([...tasks, task]);
            setFilteredTasks([...filteredTasks, task]);
            setTaskName('');
            setTaskDescription('');
            setStatus(false);
            setStartDate(null);
            setEndDate(null);
            setOpen(false);
        } catch (error) {
            navigate('/login');
            console.error(error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                }
            });

            if (response.ok) {
                setTasks(tasks.filter((task) => task.id !== id));
                setFilteredTasks(filteredTasks.filter((task) => task.id !== id));
            }
        } catch (error) {
            navigate('/login');
            console.error(error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    //

    const handleEditTask = (task) => 
    {
        try{
            const response = fetch(`http://localhost:8000/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({task}),
            });
            if(response.ok)
            {
                setTasks(
                    tasks.map((t) =>
                        t.id === task.id ? task : t
                    )
                );
                setFilteredTasks(
                    filteredTasks.map((t) =>
                        t.id === task.id ? task : t
                    )
                );
            }
        }
        catch(error)
        {
            alert('Error Editing Task');
            console.error(error);
        }
    };
    //
    const handleChange = async (id) => {
        try {
            const task = tasks.find((task) => task.id === id);
            const response = await fetch(`http://localhost:8000/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ ...task, status: !task.status }),
            });

            if (response.ok) {
                setTasks(
                    tasks.map((task) =>
                        task.id === id ? { ...task, status: !task.status } : task
                    )
                );
                setFilteredTasks(
                    filteredTasks.map((task) =>
                        task.id === id ? { ...task, status: !task.status } : task
                    )
                );

            if (!task.status) {
                setSnackbarMessage('Task has been Completed !');
                setSnackbarOpen(true);
                }
            else{
                setSnackbarMessage('Task has been marked as Incomplete !');
                setSnackbarOpen(true);
            }
            }
        } catch (error) {
            navigate('/login');
            console.error(error);
        }
        
    };


  const handleClickDeleteOpen = () => {
    setdeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setdeleteOpen(false);
  };

  const handleDelete = (id) => {
    handleDeleteTask(id);
    setdeleteOpen(false);
    setSnackbarMessage('Task Deleted Successfully ');
    setSnackbarOpen(true);

  };

   
    

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value) {
          const filtered = tasks.filter(task => task.task_name.toLowerCase().includes(value.toLowerCase()));
          setFilteredTasks(filtered);
        } else {
          setFilteredTasks(tasks);
        }
      };

    return (
        <>
            <Header username="User" />
            <div style = {{ display : 'flex' , flexDirection:'row',justifyContent : 'right',marginRight : 30 , marginBottom : 10}}>
                
                <TextField id="standard-basic" label="Search" variant="standard"
                    marginRight = {10}  
                    onChange={handleSearch}
                    />
                <Button
                    variant="contained"
                    startIcon={<AnalyticsIcon />}
                    onClick={handleStatsClickOpen}
                style={{ marginLeft: 10 }}
                >
                    Stats
                </Button>
                <StatsDialog open={statsDialogOpen} onClose={handleCloseStatsDialog} stats={stats} />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    type="submit"
                    textAlign="center"
                    onClick={handleClickOpen}
                    style = {{ marginLeft : 10}}
                >
                    Add Task
                </Button>
                
            </div>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            fullWidth
            margin="dense"
            multiline
            rows={4}
          />
          <FormControlLabel
            control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
            label="Status"
          />
          <br/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style = {{ display : 'flex',flexDirection : 'rows' , justifyContent : 'space-evenly' }}>

            <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
                fullWidth
                margin="dense"
                margin-right = {10}
                />
                <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
                fullWidth
                margin="dense"
                margin-left = {10}
                />
            
                
            </div>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
                
            < TableContainer component =  {Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Start_Date</TableCell>
                                <TableCell align="center">End_Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {filteredTasks.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.task_name}</TableCell>
                                <TableCell align="center">{row.task_description}</TableCell>
                                <TableCell align="center">{row.task_start_date}</TableCell>
                                <TableCell align="center">{row.task_end_date}</TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={row.status}
                                        onChange={() => handleChange(row.id)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                <Button
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditClick(row)} // You should pass the task object to this function
                                    ></Button>
                                    <EditTaskDialog
                                        open={editDialogOpen}
                                        onClose={handleCloseEditDialog}
                                        task={editedTask}
                                        onSaveChanges={handleSaveChanges}
                                    />
                                        
                                </TableCell>
                                <TableCell align="center">
                                <Button
                                            startIcon={<DeleteIcon />}
                                            onClick={handleClickDeleteOpen}
                                        >
                                            
                                        </Button>
                                        <Dialog open={deleteopen} onClose={handleCloseDelete}>
                                            <DialogTitle>Confirm Delete</DialogTitle>
                                            <DialogContent>
                                            Are you sure you want to delete this task?
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={handleCloseDelete}>No</Button>
                                            <Button onClick={() => handleDelete(row.id)}>Yes</Button>
                                            </DialogActions>
                                        </Dialog>
                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
                
            
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
)}

export default Tasks;
