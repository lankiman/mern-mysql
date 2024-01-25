import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      } as HeadersInit,
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "LOGIN",
        payload: data
      });
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
