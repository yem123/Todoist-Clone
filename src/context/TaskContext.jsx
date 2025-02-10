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
  const [editTask, setEditTask] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [clickId, setClickId] = useState(null);
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

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  const saveTask = (newTask) => setTasks((prev) => [...prev, newTask]);

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleAddTask = () => {
    setClickId(null);
    setIsEditorOpen(true);
  };

  const handleEditTask = (task, id) => {
    setClickId(task.id)
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
        handleEditTask,
        setClickId,
        clickId,
        isHovered,
        setIsHovered,
        isRadioHovered,
        setIsRadioHovered,
        isSticky,
        setIsSticky,
        setPageContext,
        pageContext,
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
