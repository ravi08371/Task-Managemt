import React from 'react';
import { Box, Typography } from '@mui/material';

const BoardColumn = ({ title, color, emptyMessage }) => {
    return (
      <Box
        sx={{
          bgcolor: color,
          borderRadius: '8px',
          height: '100%',
          minHeight: '400px',
          p: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 40px)',
            bgcolor: 'rgba(0,0,0,0.03)',
            borderRadius: '4px',
          }}
        >
          <Typography color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      </Box>
    );
  };
  
  export default BoardColumn;