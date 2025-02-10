import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDnDSensors, handleDragReorder } from "../utils/taskUtils";
import { useTaskContext } from "../context/TaskContext";
import TodoItem from "./TodoItem";

const Task = ({tasks}) => {
  const { setTasks, pageContext } = useTaskContext();
  const sensors = useDnDSensors();

  const [overId, setOverId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [draggingTask, setDraggingTask] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);

  const handleDragStart = ({ active }) => {
    if (!tasks || tasks.length === 1) return;
    setDraggingTask(tasks.find((task) => task.id === active.id));
    setActiveId(active.id);
    setHasMoved(false);
  };

  const handleDragMove = ({ over }) => {
    if (over && over.id !== overId) {
      setOverId(over.id);
      setHasMoved(true);
    }
  };

 const handleDragEnd = ({ active, over }) => {
   
    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

   if (!over || !hasMoved || oldIndex === newIndex) {
     setActiveId(null);
     setDraggingTask(null);
     setOverId(null);
     setHasMoved(false);
     return;
   } else setTasks((prevTasks) => handleDragReorder(active.id, over.id, prevTasks));

    setActiveId(null);
    setDraggingTask(null);
    setOverId(null);
    setHasMoved(false);
  };

const adjustTranslate = ({ transform }) => {
  return transform
    ? {
        ...transform,
        x: transform.x + 15,
      }
    : { x: 0, y: 0 };
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
        <SortableContext
          items={tasks || []}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <div key={task.id}>
              {overId === task.id && <div className="drag-placeholder" />}

              {activeId !== task.id ? (
                <div>
                  <TodoItem id={task.id} task={task} />
                </div>
              ) : null}
            </div>
          ))}
        </SortableContext>

        <DragOverlay modifiers={[adjustTranslate]}>
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
