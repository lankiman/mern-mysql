import { Request, Response } from "express";
import { pool } from "../model/database";

// get all workouts
const getWorkouts = async (req: Request, res: Response) => {
  const user_id = (req as any).user_id;
  const [workouts] = await pool.query(
    "SELECT * FROM workouts WHERE user_id=? ORDER BY created_at DESC",
    [user_id]
  );
  res.status(200).json(workouts);
};

//get a single workout

const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [workout] = await pool.query(
    `
  SELECT * 
  FROM 
  workouts 
  WHERE id=?`,
    [id]
  );
  !workout
    ? res.status(404).json({ error: "No Such Workout Found" })
    : res.status(200).json(workout);
};

//create new workout
const createWorkout = async (req: Request, res: Response) => {
  const { tittle, reps, weight } = req.body;
  let emptyFields: string[] = [];

  if (!tittle) {
    emptyFields.push("tittle");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill in all the feilds", emptyFields });
  }

  try {
    const user_id = (req as any).user_id;

    await pool.query(
      `
    INSERT INTO workouts (id, tittle, reps, weight, user_id)
    VALUES (UUID(),?, ?,?,?) 
    `,
      [tittle, reps, weight, user_id]
    );

    const [result]: any = await pool.query(
      `
    SELECT *
    FROM
    workouts
    WHERE user_id=? ORDER BY created_at DESC`,
      [user_id]
    );

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete a workout
const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Workout ID is required" });
  }

  try {
    const [idValid]: any = await pool.query(`
        SELECT id FROM workouts
      `);
    const isValidId = idValid.some((validId: any) => validId.id === id);

    if (!isValidId) {
      return res.status(404).json({ error: "Invalid workout ID" });
    }
    await pool.query("DELETE FROM workouts WHERE id = ?", [id]);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update a workout
const updateWorkout = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No Such Workout Found" });
  // }
  // const workout = await workoutModel.findOneAndUpdate(
  //   { _id: id },
  //   {
  //     ...req.body
  //   }
  // );
  // !workout
  //   ? res.status(404).json({ error: "No Such Workout Found" })
  //   : res.status(200).json(workout);
};

//exports
export { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout };
