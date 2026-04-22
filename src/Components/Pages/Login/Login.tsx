import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../Services/userServices";
import "./Login.css";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsWaiting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const response = await loginUser(values);

    if (!response.success) {
      setErrorMessage(response.error || "Login failed. Please try again.");
      setIsWaiting(false);
      return;
    }

    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
      setSuccessMessage("Login successful! Redirecting...");
      setValues({ email: "", password: "" });

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setErrorMessage("Login succeeded but no token received.");
      setIsWaiting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && <p className="auth-status error">{errorMessage}</p>}
          {successMessage && (
            <p className="auth-status success">{successMessage}</p>
          )}

          <button type="submit" className="login-button" disabled={isWaiting}>
            {isWaiting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
