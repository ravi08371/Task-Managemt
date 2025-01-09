import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Popover,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskSection = ({
  droppableId,
  tasks,
  title,
  color,
  onTaskUpdate,
  emptyMessage,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };
  const handleMenuClickStatus = (event, taskId) => {
    setAnchorElStatus(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuCloseStatus = () => {
    setAnchorElStatus(null);
    setSelectedTaskId(null);
  };

  const handleDelete = () => {
    console.log("Delete task:", selectedTaskId);
    handleMenuClose();
  };

  const handleTodoChange = (task) => {
    // console.log("Todo change", task);
    const updatedTask = {
      ...task,
      status: "To-Do",
    };
    onTaskUpdate(updatedTask);
    handleMenuCloseStatus();
  };
  const handleProgressChange = (task) => {
    const updatedTask = {
      ...task,
      status: "In Progress",
    };
    onTaskUpdate(updatedTask);
    handleMenuCloseStatus();
  };
  const handleCompletedChange = (task) => {
    const updatedTask = {
      ...task,
      status: "Completed",
    };
    onTaskUpdate(updatedTask);
    handleMenuCloseStatus();
  };

  return (
    <Box
      sx={{
        paddingBottom: "10px",
        backgroundColor: "#F1F1F1",
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          mb: 2,
          p: 2,
          fontWeight: "bold",
          fontSize: "1.2rem",
          backgroundColor: color,
          borderRadius: "12px 12px 0px 0px",
        }}
      >
        {title}
      </Box>
      {/* {tasks.length > 0 ? ( */}
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.length > 0 ? (
              <TableContainer
              // {...provided.droppableProps}
              // ref={provided.innerRef}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Select</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell
                              style={{
                                textDecoration:
                                  task?.status === "Completed" &&
                                  "line-through",
                              }}
                            >
                              {task.title}
                            </TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>
                              <Typography
                                onClick={(e) =>
                                  handleMenuClickStatus(e, task.id)
                                }
                              >
                                {task.status}
                              </Typography>
                              <Popover
                                open={Boolean(anchorElStatus)}
                                anchorEl={anchorElStatus}
                                onClose={handleMenuCloseStatus}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <Box sx={{ p: 2 }}>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => handleTodoChange(task)}
                                  >
                                    To-Do
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => handleProgressChange(task)}
                                  >
                                    In Progress
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => handleCompletedChange(task)}
                                  >
                                    Completed
                                  </Button>
                                </Box>
                              </Popover>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={(e) => handleMenuClick(e, task.id)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <Box sx={{ p: 2 }}>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => {
                                      onEdit(task);
                                      setAnchorEl(null);
                                    }}
                                    style={{
                                      display:'flex',
                                      flexDirection:'row',
                                      alignItems:'center',
                                      color:'#000000',
                                      fontWeight:'600',
                                      fontSize:'16px',
                                      justifyContent:'space-evenly'
                                    }}
                                  >
                                    <EditIcon style={{marginRight:'6px',fontSize:'18px'}} />   Edit
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={handleDelete}
                                    style={{
                                      display:'flex',
                                      flexDirection:'row',
                                      alignItems:'center',
                                      color:'#DA2F2F',
                                      fontWeight:'600',
                                      fontSize:'16px',
                                      justifyContent:'space-evenly'
                                    }}
                                  >
                                    <DeleteIcon style={{marginRight:'6px',fontSize:'18px'}}/> Delete
                                  </Button>
                                </Box>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: "center", color: "gray" }}>
                {emptyMessage}
              </Box>
            )}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default TaskSection;
