import { useTaskContext } from "../context/useTaskContext";
import Task from "./Task";
import { isToday, isPast, isFuture } from "date-fns";

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

export const UpcomingTasks = () => {
  const { tasks } = useTaskContext();
  const upcomingTasks = tasks.filter((task) => isFuture(new Date(task.dateSelected)));

  return <Task tasks={upcomingTasks} />;
};

export const InboxTasks = () => {
  const { tasks } = useTaskContext();
  const inboxTasks = tasks.filter((task) => !task.dateSelected);

  return <Task tasks={inboxTasks} />;
};