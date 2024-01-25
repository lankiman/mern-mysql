import express from "express";
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} from "../controllers/workoutControler";
import requireAuth from "../middlewares/requireAuth";

const router = express.Router();

router.use(requireAuth);

//getting all workouts
router.get("/", getWorkouts);

//Get a singe workout
router.get("/:id", getWorkout);

//post a new workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

// //updat a workout
// router.patch("/:id", updateWorkout);

export default router;
