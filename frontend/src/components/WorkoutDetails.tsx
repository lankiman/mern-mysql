import { Iworkouts } from "../interface";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";

interface Props {
  workout: Iworkouts;
}

export const WorkoutDetails = ({ workout }: Props) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.tittle}</h4>
      <p>
        <strong>reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Load (kg): </strong>
        {workout.weight}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.created_at), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};
