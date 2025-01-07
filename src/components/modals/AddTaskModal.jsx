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
} from "@mui/material";

const AddTaskModal = ({ open, onClose, onSubmit }) => {
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Task Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={taskData.category}
              onChange={handleChange}
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            label="Due Date"
            name="dueDate"
            InputLabelProps={{ shrink: true }}
            value={taskData.dueDate}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <MenuItem value="To-Do">To-Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" component="label">
            Upload Attachment
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          {preview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Selected Image:
              </Typography>
              <img src={preview} alt="Preview" style={{ width: "100%" }} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
