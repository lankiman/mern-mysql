import { workoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(workoutContext);
  if (!context) {
    throw Error("Context used within wrong component tree");
  }
  return context;
};
