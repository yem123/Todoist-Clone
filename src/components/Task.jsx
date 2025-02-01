import { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDnDSensors, handleDragReorder } from "../utils/taskUtils";
import { useTaskContext } from "../context/useTaskContext";
import TodoItem from "./TodoItem";

const Task = ({tasks}) => {
  const { setTasks } = useTaskContext();
  const sensors = useDnDSensors();

  const [overId, setOverId] = useState(null);
  const [activeId, setactiveId] = useState(null);
  const [draggingTask, setDraggingTask] = useState(null);

  const handleDragStart = ({ active }) => {
    setDraggingTask(tasks.find((task) => task.id === active.id));
    setactiveId(active.id);
  };

  const handleDragMove = ({ over }) => {
    if (over) {
      setOverId(over.id);
    }
    
  };

  const handleDragEnd = ({ active, over }) => {
    setTasks((prevTasks) => handleDragReorder(active.id, over?.id, prevTasks));
    setactiveId(null);
    setDraggingTask(null);
    setOverId(null);
  };

  return (
    <section className="task">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task, index) => (
            <div key={task.id}>
              {overId === task.id && <div className="drag-placeholder" />}

              {activeId !== task.id ? (
                <div>
                  <TodoItem id={task.id} task={task} index={index} />
                </div>
              ) : null}
            </div>
          ))}
        </SortableContext>

        <DragOverlay>
          {draggingTask ? (
            <div className="drag-overlay">
              <TodoItem id={draggingTask.id} task={draggingTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default Task;
