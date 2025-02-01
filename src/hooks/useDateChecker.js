import { useMemo } from "react";

const useDateChecker = ({ tasks, id }) => { 

    return useMemo(() => {

    const selectedTask = tasks.find((task) => task.id === id);

    const selectedDate = selectedTask?.formatedDate
    ? new Date(selectedTask.formatedDate)
    : null;

   if (!selectedDate || isNaN(selectedDate)) return null;

   const today = new Date();
   today.setHours(0, 0, 0, 0);
   selectedDate.setHours(0, 0, 0, 0);

   if (selectedDate < today) return "past";
   if (selectedDate.getTime() === today.getTime()) return "today";
   if (selectedDate > today) return "future";
   return "empty";

  }, [tasks, id]);
};

export default useDateChecker;
