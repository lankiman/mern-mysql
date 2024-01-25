import { AuthContext } from "../context/UserContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Context used within wrong component tree");
  }
  return context;
};
