import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import TaskBoardView from './taskBoard/TaskBoardView';
import TaskListView from './tasklistview/TaskListView';
import Header from './common/Header';
import FilterBar from './common/FilterBar';
import AddTaskModal from '../modals/AddTaskModal';
import { useMutation, useQueryClient } from "react-query";
import { image } from '../../images/image';


const TaskManager = () => {
  const [view, setView] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation(
    (newTask) => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => resolve(newTask), 1000);
      });
    },
    {
      onMutate: async (newTask) => {
        // Cancel any outgoing refetches to prevent overwriting optimistic update
        await queryClient.cancelQueries("tasks");

        // Snapshot previous tasks
        const previousTasks = queryClient.getQueryData("tasks") || [];

        // Optimistically update the query cache
        queryClient.setQueryData("tasks", (old) => [
          ...(old || []),
          { ...newTask, id: Date.now() },
        ]);

        // Return context to use in case of an error
        return { previousTasks };
      },
      onError: (err, newTask, context) => {
        // Roll back to the previous tasks in case of an error
        queryClient.setQueryData("tasks", context.previousTasks);
      },
      onSettled: () => {
        // Refetch the tasks after mutation
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const handleAddTask = (taskData) => {
    addTaskMutation.mutate({
      ...taskData,
      attachmentUrl: taskData.attachment
        ? URL.createObjectURL(taskData.attachment)
        : null,
    });
    toggleModal();
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const handleViewChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <img src={image.taskIconTopIcon} alt="" height="30" />
        <Typography style={{color:'#2F2F2F',fontSize:'24px',fontWeight:500}}>TaskBuddy</Typography>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={view} onChange={handleViewChange}>
          <Tab 
            label="List" 
            value="list"
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            label="Board" 
            value="board"
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
      </Box>

      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <FilterBar />
      <Header onAddTask={toggleModal} />
      </Box>

      {view === 'list' ? <TaskListView queryKey="tasks" /> : <TaskBoardView queryKey="tasks" />}
      <AddTaskModal
        open={isModalOpen}
        onClose={toggleModal}
        onSubmit={handleAddTask}
      />
    </Box>
  );
};

export default TaskManager;