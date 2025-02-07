import { useTaskContext } from "../context/TaskContext";
import Task from "./Task";
import { format, isToday, isPast, isFuture } from "date-fns";

export const TodayTasks = () => {
  const { tasks } = useTaskContext();
  const todayTasks = tasks.filter((task) => isToday(new Date(task.dateSelected)));

  return <Task tasks={todayTasks} />;
};

export const OverdueTasks = () => {
  const { tasks } = useTaskContext();
  const overdueTasks = tasks.filter(
    (task) => isPast(new Date(task.dateSelected)) && !isToday(new Date(task.dateSelected))
  );

  return <Task tasks={overdueTasks} />;
};

export const UpcomingTasks = ({selectedDate}) => {
  const { tasks } = useTaskContext();
  const upcomingTasks = tasks.filter(
        (task) =>
          format(new Date(task.dateSelected), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
  );

  return <Task tasks={upcomingTasks} />;
};

export const InboxTasks = () => {
  const { tasks } = useTaskContext();
  const inboxTasks = tasks.filter((task) => !task.dateSelected);

  return <Task tasks={inboxTasks} />;
};