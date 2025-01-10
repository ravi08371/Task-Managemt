import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Button, Avatar, useMediaQuery } from "@mui/material";
import TaskBoardView from "./taskBoard/TaskBoardView";
import TaskListView from "./tasklistview/TaskListView";
import Header from "./common/Header";
import FilterBar from "./common/FilterBar";
import AddTaskModal from "../modals/AddTaskModal";
import { useMutation, useQueryClient } from "react-query";
import { image } from "../../images/image";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const TaskManager = () => {
  const [view, setView] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const auth = getAuth();
  const isSmallScreen = useMediaQuery("(max-width:600px)");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("this is user ",user);
        // Set user's display name or email if displayName is not available
        setUserName(user.displayName || user.email);
        setUserProfile(user?.photoURL);
      } else {
        setUserName("");
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      window.location.href = "/login"; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: isSmallScreen ? 2 :3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img src={image.taskIconTopIcon} alt="" height="30" />
          <Typography
            style={{ color: "#2F2F2F", fontSize: "24px", fontWeight: 500 }}
          >
            TaskBuddy
          </Typography>
        </Box>
        <Box>
          <Typography
            style={{
              color: "#2F2F2F",
              fontSize: "16px",
              fontWeight: 400,
              display:'flex',
              alignItems:'center'
            }}
          >
            <Avatar src={userProfile} alt={userName} sx={{ width: 36, height: 36,marginRight:'6px' }} />
             {userName ? `${userName}` : "Welcome!"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs value={view} onChange={handleViewChange}>
          <Tab label="List" value="list" sx={{ textTransform: "none" }} />
          <Tab label="Board" value="board" sx={{ textTransform: "none",display: isSmallScreen && 'none' }} />
        </Tabs>
        <Box>
          <Button
            style={{
              backgroundColor: "#FFF9F9",
              border: "1px solid #7B198426",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#000",
            }}
            onClick={handleLogout}
          >
            <img
              src={image.logout_icon}
              style={{ width: "15px", height: "15px", marginRight: "6px" }}
            />{" "}
            Logout
          </Button>
        </Box>
      </Box>

      {isSmallScreen && (
        <Button
        variant="contained"
        onClick={toggleModal}
        sx={{
          bgcolor: "#9c27b0",
          borderRadius: "20px",
          textTransform: "none",
          "&:hover": {
            bgcolor: "#7b1fa2",
          },
          display:'flex',
          justifySelf:'end',
          marginBottom:'10px'
        }}
      >
        ADD TASK
      </Button>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isSmallScreen && 'column',
          width:'100%'
        }}
      >
        <FilterBar />
        <Header onAddTask={toggleModal} />
      </Box>

      {view === "list" ? (
        <TaskListView queryKey="tasks" />
      ) : (
        <TaskBoardView queryKey="tasks" />
      )}
      <AddTaskModal
        open={isModalOpen}
        onClose={toggleModal}
        onSubmit={handleAddTask}
      />
    </Box>
  );
};

export default TaskManager;
