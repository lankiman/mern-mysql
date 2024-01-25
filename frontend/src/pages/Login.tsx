import { useState } from "react";
import handleKeyDown from "../utils/keyboardUtils";
import useLogin from "..//hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        <button disabled={loading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
