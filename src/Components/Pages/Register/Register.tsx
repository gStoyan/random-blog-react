import { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../../Hooks/useForm";
import { registerUser } from "../../../Services/userServices";
import "../Login/Login.css";
import "./Register.css";

interface RegisterFormValues {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [status, setStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    const response = await registerUser({
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      password: data.password,
    });

    if (!response.success) {
      setStatus({
        type: "error",
        message: response.error || "Registration failed. Please try again.",
      });
      return false;
    }

    setStatus({
      type: "success",
      message:
        response.data?.message ||
        "Registration successful. You can now sign in.",
    });

    return true;
  };

  const { values, changeHandler, onSubmit, errors } =
    useForm<RegisterFormValues>(
      {
        name: "",
        email: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
      },
      onRegisterSubmit,
    );

  const hasValidationErrors = Boolean(
    errors.email || errors.password || errors.confirmPassword,
  );

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Create Account</h2>
        <form
          onSubmit={async (event) => {
            setStatus({ type: "idle", message: "" });
            setIsSubmitting(true);
            try {
              await onSubmit(event);
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="login-form"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={changeHandler}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={changeHandler}
              placeholder="you@example.com"
              required
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={values.dateOfBirth}
              onChange={changeHandler}
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
              onChange={changeHandler}
              placeholder="Strong password"
              required
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={changeHandler}
              placeholder="Repeat your password"
              required
            />
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword}</p>
            )}
          </div>

          {status.type !== "idle" && (
            <p className={`auth-status ${status.type}`}>{status.message}</p>
          )}

          <div className="register-actions">
            <button
              type="submit"
              className="login-button"
              disabled={hasValidationErrors || isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
