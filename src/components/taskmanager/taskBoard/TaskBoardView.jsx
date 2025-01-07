import React from 'react';
import { Box } from '@mui/material';
import BoardColumn from './BoardColumn';

const TaskBoardView = () => {
  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        p: 3,
      }}
    >
      <BoardColumn
        title="TO-DO"
        color="#fce4ec"
        emptyMessage="No Tasks in To Do"
      />
      <BoardColumn
        title="IN PROGRESS"
        color="#e3f2fd"
        emptyMessage="No Tasks In Progress"
      />
      <BoardColumn
        title="COMPLETED"
        color="#f1f8e9"
        emptyMessage="No Completed Tasks"
      />
    </Box>
  );
};

export default TaskBoardView