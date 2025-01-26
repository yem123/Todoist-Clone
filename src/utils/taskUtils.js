export const saveTaskUtil = ({
  tasks,
  setTasks,
  taskName,
  description,
  dateSelected,
  displayText,
  editTask,
}) => {
  const updatedTasks = [...tasks];

  if (editTask) {
    const index = tasks.findIndex((task) => task.id === editTask.id);
    updatedTasks[index] = {
      ...editTask,
      taskName: taskName.trim(),
      description: description.trim(),
      dateSelected,
      formatedDate: displayText,
    };
  } else {
    updatedTasks.push({
      id: Date.now(),
      taskName: taskName.trim(),
      description: description.trim(),
      dateSelected,
      formatedDate: displayText,
    });
  }

  setTasks(updatedTasks);
};
