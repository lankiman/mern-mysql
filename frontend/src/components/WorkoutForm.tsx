import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import handleKeyDown from "../utils/keyboardUtils";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [tittle, setTittle] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState<any | null>(null);
  const { dispatch } = useWorkoutsContext();
  const [emptyFields, setEmtpyFields] = useState<string[]>([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workout = { tittle, weight, reps };

    if (!tittle) {
      emptyFields.push("tittle");
    }
    if (!weight) {
      emptyFields.push("weight");
    }
    if (!reps) {
      emptyFields.push("reps");
    }

    if (emptyFields.length > 0 && (!reps || !tittle || !weight)) {
      setEmtpyFields(emptyFields);
      setError("Please Fill in all the Fields");
      return;
    } else if (tittle && reps && weight && emptyFields.length > 0) {
      setEmtpyFields([]);
      setError(null);
    }
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      } as HeadersInit
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setError(data.message);
    }
    if (response.ok) {
      setTittle("");
      setWeight("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };
  return (
    <form className="create" action="" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label> Exercise Tittle:</label>
      <input
        type="text"
        value={tittle}
        name="tittle"
        onChange={(e) => {
          setTittle(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className={emptyFields.includes("tittle") ? "error" : ""}
      />

      <label>Load (in Kg): </label>
      <input
        type="number"
        name="weight"
        value={weight}
        onChange={(e) => {
          setWeight(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className={emptyFields.includes("weight") ? "error" : ""}
      />
      <label>Reps : </label>
      <input
        type="number"
        name="reps"
        value={reps}
        onChange={(e) => {
          setReps(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
