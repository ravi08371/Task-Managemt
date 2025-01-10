import React from "react";
import {
  Box,
  Select,
  MenuItem,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useFilterState } from "./useFilterState";
import { useQuery, useQueryClient } from "react-query";

const FilterBar = () => {
  const { updateFilter } = useFilterState();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const queryClient = useQueryClient();
  const { data: tasks = [] } = useQuery(
    "tasks",
    () => queryClient.getQueryData("tasks") || []
  );

  const uniqueDueDates = [...new Set(tasks?.map((task) => task.dueDate))];

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3,width:'100%' }}>
      <Select
        defaultValue=""
        displayEmpty
        size="small"
        sx={{
          minWidth: 120,
          bgcolor: "white",
          borderRadius:  "60px",
          fontSize: isSmallScreen && "12px",
        }}
        onChange={(e) => updateFilter({ category: e.target.value })}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Personal">Personal</MenuItem>
      </Select>
      <Select
        defaultValue=""
        displayEmpty
        size="small"
        sx={{
          minWidth: 120,
          bgcolor: "white",
          borderRadius: "60px",
          fontSize: isSmallScreen && "12px",
        }}
        onChange={(e) => updateFilter({ dueDate: e.target.value })}
      >
        <MenuItem value="">All Due Dates</MenuItem>
        {uniqueDueDates?.map((date) => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default FilterBar;
