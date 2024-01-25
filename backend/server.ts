import express from "express";
import dotenv from "dotenv";
import router from "./routes/workout";
import userRouter from "./routes/user";

//invoke config method
dotenv.config();

//created express app
const app = express();

//global middlewary
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//route handler

app.use("/api/workouts", router);
app.use("/api/user", userRouter);

//connect to db
async function conn() {
  try {
    //liten for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on specified port");
    });
  } catch (error) {
    console.log("error connecting:", error);
  }
}
conn();
