// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import { WorkoutContextProvider } from "./context/WorkoutContext.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <WorkoutContextProvider>
//       <App />
//     </WorkoutContextProvider>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WorkoutContextProvider } from "./context/WorkoutContext.tsx";
import { AuthProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
