// // src/components/common/Header.jsx
// import React from 'react';
// import { Box, Button, IconButton, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled } from '@mui/material/styles';

// const StyledTextField = styled(TextField)({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '20px',
//     height: '36px',
//     width: '200px',
//     backgroundColor: 'white',
//     '& fieldset': {
//       borderColor: '#e0e0e0',
//     },
//   },
// });

// const Header = ({ onAddTask }) => {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//       <Box sx={{ display: 'flex', gap: 2, alignItems: 'center',marginRight:'10px' }}>
//         <StyledTextField
//           placeholder="Search"
//           size="small"
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />,
//           }}
//         />
//       </Box>
//       <Button
//         variant="contained"
//         onClick={onAddTask}
//         sx={{
//           bgcolor: '#9c27b0',
//           borderRadius: '20px',
//           textTransform: 'none',
//           '&:hover': {
//             bgcolor: '#7b1fa2',
//           },
//         }}
//       >
//         ADD TASK
//       </Button>
//     </Box>
//   );
// };
// export default Header

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useFilterState } from "./useFilterState";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    height: "36px",
    width: "200px",
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
  },
});

const Header = ({ onAddTask }) => {
  const { updateFilter } = useFilterState();

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginRight: "10px" }}>
        <StyledTextField
          placeholder="Search"
          size="small"
          onChange={(e) => updateFilter({ searchTerm: e.target.value })}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
          }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={onAddTask}
        sx={{
          bgcolor: "#9c27b0",
          borderRadius: "20px",
          textTransform: "none",
          "&:hover": {
            bgcolor: "#7b1fa2",
          },
        }}
      >
        ADD TASK
      </Button>
    </Box>
  );
};

export default Header;
