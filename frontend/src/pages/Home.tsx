// import { useEffect, useState } from "react";
// import { Iworkouts } from "../interface";
// import { WorkoutDetails } from "../components/WorkoutDetails";
// import WorkoutForm from "../components/WorkoutForm";
// import { useWorkoutsContext } from "../hooks/useWorkoutContext";

// const Home = () => {
//   const { workouts, dispatch } = useWorkoutsContext();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchWorkout() {
//       try {
//         const response = await fetch("/api/workouts");
//         const data = await response.json();
//         if (response.status === 200) {
//           dispatch({ type: "SET_WORKOUTS", payload: data });
//         } else {
//           console.log("no Data found");
//         }
//       } catch (error) {
//         setLoading(false);
//         console.log(error, "unable to fetch data");
//       }
//     }
//     fetchWorkout();
//   }, []);

//   useEffect(() => {
//     if (!workouts) {
//       setLoading(true);
//     } else {
//       setLoading(false);
//     }
//   }, [workouts]);

//   return (
//     <div className="home">
//       <div key="workouts" className="workouts">
//         {loading && (
//           <div className="flex items-center justify-center w-full h-full gap-4">
//             <p className="w-8 h-8 border-t-4 border-black rounded-full animate-spin"></p>
//             <p className="text-2xl font-bold text-black animate-pulse">
//               Please Wait....
//             </p>
//           </div>
//         )}
//         {!loading &&
//           workouts &&
//           workouts.map((workout: Iworkouts) => (
//             <WorkoutDetails workout={workout} key={workout.id} />
//           ))}
//       </div>

//       <WorkoutForm />
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import { Iworkouts } from "../interface";
import { WorkoutDetails } from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch("/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`
          } as HeadersInit
        });
        const data = await response.json();
        if (response.status === 200) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        } else {
          console.log("no Data found");
        }
      } catch (error) {
        setLoading(false);
        console.log(error, "unable to fetch data");
      }
    }
    if (user) {
      fetchWorkout();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!workouts) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [workouts]);

  return (
    <div className="home">
      <div key="workouts" className="workouts">
        {!user && (
          <div className="flex items-center justify-center w-full h-full text-2xl font-black">
            You must be Logged in To access workouts
          </div>
        )}
        {loading && user && (
          <div className="flex items-center justify-center w-full h-full gap-4">
            <p className="w-8 h-8 border-t-4 border-black rounded-full animate-spin"></p>
            <p className="text-2xl font-bold text-black animate-pulse">
              Please Wait....
            </p>
          </div>
        )}
        {!loading && !workouts && (
          <div className="flex items-center justify-center w-full h-full gap-4">
            <p className="text-2xl font-bold text-black animate-pulse">
              Unable to Fetch Data, Refresh the Page to Try again
            </p>
          </div>
        )}
        {!loading && workouts && workouts.length == 0 && (
          <div className="flex items-center justify-center w-full h-full gap-4">
            <p className="text-2xl font-bold text-black animate-pulse">
              No Available Workouts
            </p>
          </div>
        )}
        {!loading &&
          workouts &&
          workouts.map((workout: Iworkouts) => (
            <WorkoutDetails workout={workout} key={workout.id} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
