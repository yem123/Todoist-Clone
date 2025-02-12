import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/**
 * Handles reordering of tasks when a drag event ends.
 * @param {string} activeId - The ID of the dragged item.
 * @param {string} overId - The ID of the target drop position.
 * @param {Array} tasks - The list of tasks.
 * @returns {Array} - The reordered task array.
 */

export const handleDragReorder = (activeId, overId, tasks) => {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return tasks;
  if (!overId || activeId === overId) return tasks;

  const oldIndex = tasks.findIndex((task) => task.id === activeId);
  const newIndex = tasks.findIndex((task) => task.id === overId);

  if (oldIndex === -1 || newIndex === -1) return tasks;

  return arrayMove(tasks, oldIndex, newIndex);
};

/**
 * Creates drag-and-drop sensors with pointer and keyboard support.
 * @returns {Array} Sensors for DndContext.
 */
export const useDnDSensors = () => {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 10,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
};

export const saveTaskUtil = ({
  tasks,
  setTasks,
  taskName,
  description,
  dateSelected,
  displayDate,
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
      displayDate,
    };
  } else {
    updatedTasks.push({
      id: Date.now(),
      taskName: taskName.trim(),
      description: description.trim(),
      dateSelected,
      displayDate,
    });
  }

  setTasks(updatedTasks);
};
