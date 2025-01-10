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
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
                      <TableCell width={10}>Select</TableCell>
                      <TableCell width={10}></TableCell>
                      <TableCell>Task name</TableCell>
                      <TableCell style={{display: isSmallScreen && 'none'}}>Description</TableCell>
                      <TableCell style={{display: isSmallScreen && 'none'}}>Due on</TableCell>
                      <TableCell style={{display: isSmallScreen && 'none'}}>Task Category</TableCell>
                      <TableCell style={{display: isSmallScreen && 'none'}}>Task Status</TableCell>
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
                            <TableCell width={10}>
                              <Checkbox />
                            </TableCell>
                            <TableCell width={10}>
                              <CheckCircleIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginTop: "4px",
                                  color:
                                    task?.status === "Completed"
                                      ? "green"
                                      : "grey",
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{
                                textDecoration:
                                  task?.status === "Completed" &&
                                  "line-through",
                                textTransform: "capitalize",
                              }}
                            >
                              {task.title}
                            </TableCell>
                            <TableCell style={{ textTransform: "capitalize" ,display: isSmallScreen && 'none'}}>
                              {task.description}
                            </TableCell>
                            <TableCell style={{display: isSmallScreen && 'none'}}>{task.dueDate}</TableCell>
                            <TableCell style={{display: isSmallScreen && 'none'}}>{task.category}</TableCell>
                            <TableCell style={{display: isSmallScreen && 'none'}}>
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
                                <Box sx={{ p: 1 }}>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => handleTodoChange(task)}
                                    style={{fontSize:'12px',fontWeight:600,color:'#000'}}
                                  >
                                    To-Do
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => handleProgressChange(task)}
                                    style={{fontSize:'12px',fontWeight:600,color:'#000'}}
                                  >
                                    In Progress
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => handleCompletedChange(task)}
                                    style={{fontSize:'12px',fontWeight:600,color:'#000'}}
                                  >
                                    Completed
                                  </Button>
                                </Box>
                              </Popover>
                            </TableCell>
                            <TableCell 
                            // style={{display: isSmallScreen && 'none'}}
                            >
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
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      color: "#000000",
                                      fontWeight: "600",
                                      fontSize: "16px",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <EditIcon
                                      style={{
                                        marginRight: "6px",
                                        fontSize: "18px",
                                      }}
                                    />{" "}
                                    Edit
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={handleDelete}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      color: "#DA2F2F",
                                      fontWeight: "600",
                                      fontSize: "16px",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <DeleteIcon
                                      style={{
                                        marginRight: "6px",
                                        fontSize: "18px",
                                      }}
                                    />{" "}
                                    Delete
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
