// import { Box, Paper, Typography } from "@mui/material";

// const TaskSection = ({ title, tasks = [], color, emptyMessage }) => {
//   return (
//     <Paper
//       sx={{
//         mb: 2,
//         bgcolor: color,
//         overflow: "hidden",
//         borderRadius: "8px",
//       }}
//     >
//       <Box sx={{ p: 2 }}>
//         <Typography variant="subtitle1" sx={{ mb: 2 }}>
//           {title} (0)
//         </Typography>
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <Paper
//               key={task.id}
//               sx={{
//                 p: 2,
//                 mb: 2,
//                 backgroundColor: color,
//                 boxShadow: 0,
//               }}
//             >
//               <Typography variant="subtitle1">{task.title}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {task.description}
//               </Typography>
//             </Paper>
//           ))
//         ) : (
//           <Typography variant="body2" color="text.secondary">
//             {emptyMessage}
//           </Typography>
//         )}
//       </Box>
//     </Paper>
//   );
// };

// export default TaskSection;
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskSection = ({ tasks, title, color, onTaskUpdate, emptyMessage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleEdit = () => {
    console.log("Edit task:", selectedTaskId);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete task:", selectedTaskId);
    handleMenuClose();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTask = {
      ...tasks[result.source.index],
      status: title.toLowerCase(), // Update status based on section title
    };
    onTaskUpdate(updatedTask);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: color, borderRadius: 2, mb: 2 }}>
      <Box sx={{ mb: 2, fontWeight: "bold", fontSize: "1.2rem" }}>{title}</Box>
      {tasks.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={title}>
            {(provided) => (
              <TableContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
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
                    {tasks.map((task, index) => (
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
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
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
                                    onClick={handleEdit}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="text"
                                    onClick={handleDelete}
                                  >
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
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Box sx={{ textAlign: "center", color: "gray" }}>{emptyMessage}</Box>
      )}
    </Box>
  );
};

export default TaskSection;
