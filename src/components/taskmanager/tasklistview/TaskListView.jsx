// import React from 'react';
// import { Box, Typography, Paper } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import TaskSection from './TaskSection';
// import { useQuery, useQueryClient } from "react-query";

import { Box } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import TaskSection from "./TaskSection";

// const fetchTasks = async () => {
//     // Simulate an API call to fetch tasks
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve([
//           { id: 1, title: "Task 1", status: "todo", description: "Todo Task" },
//           { id: 2, title: "Task 2", status: "in-progress", description: "In Progress Task" },
//           { id: 3, title: "Task 3", status: "completed", description: "Completed Task" },
//         ]);
//       }, 1000);
//     });
//   };

// const TaskListView = () => {
//     const queryClient = useQueryClient();

//     const { data: tasks = [], isLoading } = useQuery("tasks", () => {
//         console.log("Fetching tasks from cache:", queryClient.getQueryData("tasks"));

//         return queryClient.getQueryData("tasks") || [];
//       });

    

//     // Filter tasks into sections based on their status
//   const todoTasks = tasks.filter((task) => task.status === "To-Do");
//   const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
//   const completedTasks = tasks.filter((task) => task.status === "completed");

//   if (isLoading) {
//     return <Box sx={{ p: 3 }}>Loading tasks...</Box>;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <TaskSection
//         title="Todo"
//         tasks={todoTasks}
//         color="#fce4ec"
//         emptyMessage="No Tasks in To Do"
//       />
      
//       <TaskSection
//         title="In Progress"
//         tasks={inProgressTasks}
//         color="#e3f2fd"
//         emptyMessage="No Tasks In Progress"
//       />
      
//       <TaskSection
//         title="Completed"
//         tasks={completedTasks}
//         color="#f1f8e9"
//         emptyMessage="No Completed Tasks"
//       />
//     </Box>
//   );
// };
  
//   export default TaskListView;

const TaskListView = () => {
    const queryClient = useQueryClient();
    const { data: tasks = [] } = useQuery("tasks", () => queryClient.getQueryData("tasks") || []);
  
    const handleTaskUpdate = (updatedTask) => {
      // Update task status in cache
      queryClient.setQueryData("tasks", (oldTasks) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, status: updatedTask.status } : task
        )
      );
    };
  
    return (
      <Box sx={{ p: 3 }}>
        <TaskSection
          title="Todo"
          tasks={tasks.filter((task) => task.status === "To-Do")}
          color="#fce4ec"
          onTaskUpdate={handleTaskUpdate}
          emptyMessage="No Tasks in To Do"
        />
        <TaskSection
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "in-progress")}
          color="#e3f2fd"
          onTaskUpdate={handleTaskUpdate}
          emptyMessage="No Tasks In Progress"
        />
        <TaskSection
          title="Completed"
          tasks={tasks.filter((task) => task.status === "completed")}
          color="#f1f8e9"
          onTaskUpdate={handleTaskUpdate}
          emptyMessage="No Completed Tasks"
        />
      </Box>
    );
  };
  
  export default TaskListView;
  