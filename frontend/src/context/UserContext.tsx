import { ReactNode, createContext, useReducer, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<any>([]);

export const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: Props) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null
  });
  console.log("Authcontext State", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
