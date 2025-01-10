import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useStyles } from "./styles";

const AddTaskModal = ({ open, onClose, onSubmit }) => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery("(max-width:600px)");


  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    status: "To-Do",
    attachment: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTaskData({ ...taskData, attachment: e.target.files[0] });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSubmit(taskData);
    setTaskData({
      title: "",
      description: "",
      category: "",
      dueDate: "",
      status: "",
      attachment: null,
    });
    setPreview(null);
    onClose();
  };
  const handleChangeCategory = (cate) => {
    setTaskData((prev) => ({ ...prev, category: cate }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{fontWeight:600}}>Create Task</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            placeholder="Task Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            fullWidth
            className={classes.textFieldStyle}
          />
          <TextField
            placeholder="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            className={classes.textFieldStyle}
          />
          {/* Form Fields */}
        <div className={classes.formGrid}>
          <div className={classes.fieldRow} style={{display:isSmallScreen&& 'flex',flexDirection:isSmallScreen && 'column'}}>
            <div>
              <label className={classes.label}>Task Category*</label>
              <div className={classes.categoryButtons}>
                <button
                  className={`${classes.categoryButton} ${
                    taskData.category === "Work" ? "active" : ""
                  }`}
                  onClick={() => handleChangeCategory("Work")}
                >
                  Work
                </button>
                <button
                  className={`${classes.categoryButton} ${
                    taskData.category === "Personal" ? "active" : ""
                  }`}
                  onClick={() => handleChangeCategory("Personal")}
                >
                  Personal
                </button>
              </div>
            </div>
            <div>
              <TextField
                type="date"
                placeholder="Due Date"
                name="dueDate"
                InputLabelProps={{ shrink: true }}
                value={taskData.dueDate}
                onChange={handleChange}
                fullWidth
                className={classes.textFieldStyle}
              />
            </div>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className={classes.textFieldStyle}
              >
                <MenuItem value="To-Do">To-Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
          <div className={classes.dropZone} style={{fontSize:isSmallScreen && '12px'}}>
            Drop your files here to{" "}
          <Button component="label" style={{fontSize:isSmallScreen && '12px'}}>
            Upload 
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          </div>
          {preview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Selected Image:
              </Typography>
              <img src={preview} alt="Preview" style={{ width: "138px",height:'128px' }} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  style={{backgroundColor:'#FFFFFF',borderRadius:'41px',fontSize:'14px',fontWeight:600,padding:'10px 31px',border:'1px solid #00000030',color:'#000'}}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" style={{backgroundColor:'#7B1984',borderRadius:'41px',fontSize:'14px',fontWeight:600,padding:'10px 31px'}}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
