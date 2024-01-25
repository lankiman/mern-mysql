import { ReactNode, createContext, useReducer } from "react";
import { Iworkouts } from "../interface";

interface Props {
  children: ReactNode;
}

export const workoutReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (w: Iworkouts) => w.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export const workoutContext = createContext<any>([]);

export const WorkoutContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null
  });

  return (
    <workoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </workoutContext.Provider>
  );
};
