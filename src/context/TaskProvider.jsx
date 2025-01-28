import { createContext, useState, useEffect } from "react";

const TaskContext = createContext();

const getInitialTodos = () => {
  try {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => getInitialTodos());
  const [editTask, setEditTask] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [tasks]);

  const deleteTask = (index) =>
    setTasks((prev) => prev.filter((_, i) => i !== index));

  const saveTask = (newTask) => setTasks((prev) => [...prev, newTask]);

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleAddTask = () => {
    setIsEditorOpen(true);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        editTask,
        setEditTask,
        isEditorOpen,
        setIsEditorOpen,
        deleteTask,
        saveTask,
        updateTask,
        handleAddTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
