import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Popover,
  Button,
} from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BoardColumn = ({
  droppableId,
  title,
  tasks,
  color,
  emptyMessage,
  onEdit,
}) => {
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
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
  };


  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            bgcolor: "#F1F1F1",
            borderRadius: "8px",
            height: "100%",
            minHeight: "500px",
            p: 2,
            transition: "background-color 0.3s, border 0.3s",
            border: snapshot.isDraggingOver ? "2px dashed #90caf9" : "none",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              fontWeight: 400,
              color: "text.primary",
              backgroundColor: color,
              borderRadius: "4px",
              padding: "4px 8px",
              width: "116px",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              height: "calc(100% - 40px)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        p: 2,
                        bgcolor: "white",
                        boxShadow: 1,
                        borderRadius: "4px",
                        cursor: "grab",
                        height: "110px",
                        boxShadow: "none",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            textTransform: "capitalize",
                            textDecoration: task?.status === 'Completed' && "line-through"
                          }}
                        >
                          {task.title}
                        </Typography>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, task.id)}
                        >
                          <MoreHorizIcon />
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
                             <EditIcon style={{marginRight:'6px',fontSize:'18px'}} />  Edit
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
                             <DeleteIcon style={{marginRight:'6px',fontSize:'18px'}}/>  Delete
                            </Button>
                          </Box>
                        </Popover>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {task?.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {task?.dueDate}
                        </Typography>
                      </div>
                    </Paper>
                  )}
                </Draggable>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                <Typography>{emptyMessage}</Typography>
              </Box>
            )}
            {provided.placeholder}
          </Box>
        </Box>
      )}
    </Droppable>
  );
};

export default BoardColumn;
