import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import Task from "./Task";
import { format, isToday, isPast } from "date-fns";

export const TodayTasks = () => {
  const { tasks, setPageContext } = useTaskContext();
  const todayTasks = tasks.filter((task) => isToday(new Date(task.dateSelected)));
  useEffect(() => {
    setPageContext("Today");
  }, [setPageContext]);
  return <Task tasks={todayTasks} />;
};

export const OverdueTasks = () => {
  const { tasks, setPageContext } = useTaskContext();
  const overdueTasks = tasks.filter(
    (task) => isPast(new Date(task.dateSelected)) && !isToday(new Date(task.dateSelected))
  );

   useEffect(() => {
     setPageContext("Overdue");
   }, [setPageContext]);

  return <Task tasks={overdueTasks} />;
};

export const UpcomingTasks = ({selectedDate}) => {
  const { tasks, setPageContext } = useTaskContext();
  const upcomingTasks = tasks.filter(
        (task) =>
          format(new Date(task.dateSelected), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
  );
   useEffect(() => {
     setPageContext("Upcoming");
   }, [setPageContext]);

  return <Task tasks={upcomingTasks} />;
};

export const InboxTasks = () => {
  const { tasks, setPageContext } = useTaskContext();
  const inboxTasks = tasks;
   useEffect(() => {
     setPageContext("Inbox");
   }, [setPageContext]);

  return <Task tasks={inboxTasks} />;
};