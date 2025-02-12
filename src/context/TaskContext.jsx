import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

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
  const [countCompleted, setCountCompleted] = useState(0);
  const [editTask, setEditTask] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isClickId, setIsClickId] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [isRadioHovered, setIsRadioHovered] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [pageContext, setPageContext] = useState("Today");
  

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [tasks]);

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCountCompleted((prevCount) => prevCount + 1);
  };

  const saveTask = (newTask) => setTasks((prev) => [...prev, newTask]);

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map(
        (task) => (task.id === updatedTask.id ? { ...updatedTask } : task)
      )
    );
  };

  const handleAddTask = () => {
    setIsClickId(null);
    setIsEditorOpen(true);
  };

  const handlePlusButton = () => {
    setIsClickId("globalEditor");
  };

  const handleEditTask = (task, id) => {
    setIsClickId(task.id)
    setEditTask(tasks.find((t) => t.id === id));
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
        handlePlusButton,
        handleEditTask,
        setIsClickId,
        isClickId,
        isHovered,
        setIsHovered,
        isRadioHovered,
        setIsRadioHovered,
        isSticky,
        setIsSticky,
        setPageContext,
        pageContext,
        countCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
export default TaskContext;
