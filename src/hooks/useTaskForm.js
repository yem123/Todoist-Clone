import { useState, useEffect } from "react";

const useTaskForm = (editTask) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.taskName || "");
      setDescription(editTask.description || "");
    }
  }, [editTask]);

  const resetForm = () => {
    setTaskName("");
    setDescription("");
  };

  return { taskName, setTaskName, description, setDescription, resetForm };
}

export default useTaskForm;
