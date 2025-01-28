import { CSS } from "@dnd-kit/utilities";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const deleteTask = (tasks, index) => tasks.filter((_, i) => i !== index);

export const handleEditTask = (task, setEditTask, setIsEditorOpen) => {
  setEditTask(task);
  setIsEditorOpen(true);
};

export const handleDragReorder = (activeId, overId, tasks) => {
  if (!overId || activeId === overId) return tasks;

  const oldIndex = tasks.findIndex((task) => task.id === activeId);
  const newIndex = tasks.findIndex((task) => task.id === overId);

  return arrayMove(tasks, oldIndex, newIndex);
};

export const useDnDSensors = () =>
  useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

export const getSortableStyle = (transform, transition) => ({
  transform: CSS.Translate.toString(transform),
  transition,
});

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
