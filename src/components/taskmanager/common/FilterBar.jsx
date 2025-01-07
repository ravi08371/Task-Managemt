import React from 'react';
import { Box, Select, MenuItem } from '@mui/material';

const FilterBar = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <Select
        value="category"
        displayEmpty
        size="small"
        sx={{ minWidth: 120, bgcolor: 'white' }}
      >
        <MenuItem value="category">Category</MenuItem>
      </Select>
      <Select
        value="dueDate"
        displayEmpty
        size="small"
        sx={{ minWidth: 120, bgcolor: 'white' }}
      >
        <MenuItem value="dueDate">Due Date</MenuItem>
      </Select>
    </Box>
  );
};

export default FilterBar