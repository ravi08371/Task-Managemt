import React, { useState } from "react";
import { Box } from "@mui/material";
import BoardColumn from "./BoardColumn";
import { DragDropContext } from "@hello-pangea/dnd";
import { useQuery, useQueryClient } from "react-query";
import TaskEditModal from "../common/TaskEditModal";
import { useFilterState } from "../common/useFilterState";

const TaskBoardView = () => {
  const queryClient = useQueryClient();
  const { data: tasks = [] } = useQuery(
    "tasks",
    () => queryClient.getQueryData("tasks") || []
  );
  const [selectedTask, setSelectedTask] = useState(null);

  const { filterState } = useFilterState();

  const { searchTerm, category, dueDate } = filterState;

  const handleTaskUpdate = (updatedTask) => {
    // console.log("this is updated task-->", updatedTask);
    // Update the task's status in the cache
    queryClient.setQueryData("tasks", (oldTasks) =>
      oldTasks.map((task) =>
        task.id === updatedTask.id
          ? { ...task, status: updatedTask.status }
          : task
      )
    );
  };
  const handleTaskUpdateModal = (updatedTask) => {
    // console.log("this is updated task-->", updatedTask);
    // Update the task's status in the cache
    queryClient.setQueryData("tasks", (oldTasks) =>
      oldTasks.map((task) =>
        task.id === updatedTask.id
          ? {
              ...task,
              status: updatedTask?.status,
              title: updatedTask?.title,
              description: updatedTask?.description,
              dueDate: updatedTask?.dueDate,
              category: updatedTask?.category,
              attachment: updatedTask?.attachment,
            }
          : task
      )
    );
    setSelectedTask(null);
  };

  const handleDragEnd = (result) => {
    // console.log("this is handleDragEnd task-->",result);

    const { source, destination } = result;

    if (!destination) return; // Dropped outside any droppable
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return; // Dropped in the same position

    const draggedTask = tasks.find(
      (task) => task.status === source.droppableId
    );
    // console.log("this is draggedTask task-->",draggedTask,tasks);

    if (draggedTask) {
      const updatedTask = {
        ...draggedTask,
        status: destination.droppableId, // Set the new status based on the destination droppableId
      };
      handleTaskUpdate(updatedTask);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task); // Open modal with task data
  };

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? task.category === category : true;
    const matchesDueDate = dueDate ? task.dueDate === dueDate : true;

    return matchesSearch && matchesCategory && matchesDueDate;
  });

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            p: 3,
          }}
        >
          <BoardColumn
            droppableId="To-Do"
            title="TO-DO"
            tasks={filteredTasks.filter((task) => task.status === "To-Do")}
            color="#FAC3FF"
            emptyMessage="No Tasks in To Do"
            onEdit={handleEditClick}
          />
          <BoardColumn
            droppableId="In Progress"
            title="IN PROGRESS"
            tasks={filteredTasks.filter((task) => task.status === "In Progress")}
            color="#85D9F1"
            emptyMessage="No Tasks In Progress"
            onEdit={handleEditClick}
          />
          <BoardColumn
            droppableId="Completed"
            title="COMPLETED"
            tasks={filteredTasks.filter((task) => task.status === "Completed")}
            color="#A2D6A0"
            emptyMessage="No Completed Tasks"
            onEdit={handleEditClick}
          />
        </Box>
      </DragDropContext>
      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleTaskUpdateModal}
        />
      )}
    </>
  );
};

export default TaskBoardView;
