import React, { useState } from "react";
import { useStyles } from "./styles";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

const TaskModal = ({ task, onClose, onSave }) => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    category: task.category,
    dueDate: task.dueDate,
    attachment: task?.attachment,
    id: task?.id,
  });

  const [charCount, setCharCount] = useState(78);
  const [preview, setPreview] = useState( task?.attachment ? URL?.createObjectURL(task?.attachment): null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, attachment: e.target.files[0] });
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeCategory = (cate) => {
    setFormData((prev) => ({ ...prev, category: cate }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContainer}>
        {/* Header */}
        <div className={classes.modalHeader}>
          <TextField
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            className={classes.textFieldStyle}
          />
        </div>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          className={classes.textFieldStyle}
        />
        <div className={classes.charCount}>{charCount}/300 characters</div>

        {/* Form Fields */}
        <div className={classes.formGrid}>
          <div className={classes.fieldRow}style={{display:isSmallScreen&& 'flex',flexDirection:isSmallScreen && 'column'}}>
            <div>
              <label className={classes.label}>Task Category*</label>
              <div className={classes.categoryButtons}>
                <button
                  className={`${classes.categoryButton} ${
                    formData.category === "Work" ? "active" : ""
                  }`}
                  onClick={() => handleChangeCategory("Work")}
                >
                  Work
                </button>
                <button
                  className={`${classes.categoryButton} ${
                    formData.category === "Personal" ? "active" : ""
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
                label="Due Date"
                name="dueDate"
                InputLabelProps={{ shrink: true }}
                value={formData.dueDate}
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
                value={formData.status}
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

        {/* Activity Log */}
        {/* <div className={classes.activityCard}>
          <h3 className={classes.activityHeader}>Activity</h3>
          <div className={classes.activityList}>
            <div className={classes.activityItem}>
              <span>You created this task</span>
              <span>Dec 27 at 1:15 pm</span>
            </div>
            <div className={classes.activityItem}>
              <span>You changed status from in progress to complete</span>
              <span>Dec 28 at 1:15 pm</span>
            </div>
            <div className={classes.activityItem}>
              <span>You uploaded file</span>
              <span>Dec 29 at 1:15 pm</span>
            </div>
          </div>
        </div> */}

        {/* Attachment */}
        <div className={classes.uploadArea}>
          <label className={classes.label}>Attachment</label>
          <div className={classes.dropZone}style={{fontSize:isSmallScreen && '12px'}}>
            Drop your files here to{" "}
            <Button component="label" className={classes.uploadLink}style={{fontSize:isSmallScreen && '12px'}}>
              Update 
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
          </div>
        </div>
        {preview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Selected Image:
            </Typography>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "148px", height: "128px" }}
            />
          </Box>
        )}

        {/* Footer */}
        <div className={classes.footer}>
          <button className={classes.cancelButton} onClick={onClose}style={{backgroundColor:'#FFFFFF',borderRadius:'41px',fontSize:'14px',fontWeight:600,padding:'10px 31px',border:'1px solid #00000030',color:'#000'}}>
            CANCEL
          </button>
          <button className={classes.updateButton} onClick={handleSave} style={{backgroundColor:'#7B1984',borderRadius:'41px',fontSize:'14px',fontWeight:600,padding:'10px 31px'}}>
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
