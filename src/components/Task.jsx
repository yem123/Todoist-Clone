import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDnDSensors, handleDragReorder } from "../utils/taskUtils";
import { useTaskContext } from "../context/useTaskContext";
import TodoItem from "./TodoItem";

const Task = () => {
  const { tasks, setTasks } = useTaskContext();
  const sensors = useDnDSensors();

  const handleDragEnd = ({ active, over }) => {
    setTasks((prevTasks) => handleDragReorder(active.id, over?.id, prevTasks));
  };

  return (
    <section className="task">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task, index) => (
            <TodoItem key={task.id} id={task.id} task={task} index={index} />
          ))}
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default Task;
