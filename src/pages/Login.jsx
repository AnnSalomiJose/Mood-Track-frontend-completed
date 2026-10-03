
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/users"
      );

      const user = response.data.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      if (!user) {
        setError("Invalid email or password");
        return;
      }

      // Save logged-in user in SessionStorage
      sessionStorage.setItem(
        "loggedUser",
        JSON.stringify(user)
      );

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#0b0f0d",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#20c768",
          opacity: "0.05",
          borderRadius: "50%",
          filter: "blur(100px)",
          top: "-200px",
          left: "-150px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "#39ff88",
          opacity: "0.04",
          borderRadius: "50%",
          filter: "blur(100px)",
          bottom: "-180px",
          right: "-120px",
        }}
      />

      {/* Main Card */}
      <div
        className="row g-0"
        style={{
          width: "100%",
          maxWidth: "1000px",
          background: "#111814",
          border: "1px solid #1d3325",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.55)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div
          className="col-lg-6 d-flex flex-column justify-content-center"
          style={{
            background:
              "linear-gradient(145deg, #102619, #0b0f0d)",
            padding: "50px",
            borderRight: "1px solid #1d3325",
          }}
        >
         

          <h1
            className="fw-bold mb-3"
            style={{
              color: "#ffffff",
              fontSize: "38px",
              lineHeight: "1.2",
            }}
          >
            Daily Mood
            <br />
            <span style={{ color: "#39ff88" }}>
              Tracker
            </span>
          </h1>

          <p
            style={{
              color: "#89968e",
              fontSize: "15px",
              lineHeight: "1.8",
              maxWidth: "420px",
            }}
          >
            Track your daily emotions, understand your
            feelings and discover your emotional patterns
            with a simple and organized mood tracker.
          </p>

          {/* Features */}
          <div className="mt-4">

            <div
              className="d-flex align-items-center mb-3"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#0b0f0d",
                  border: "1px solid #285538",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                📝
              </div>

              <div>
                <div
                  className="fw-semibold"
                  style={{ color: "#ffffff" }}
                >
                  Track Your Mood
                </div>

                <small style={{ color: "#89968e" }}>
                  Record your daily emotions
                </small>
              </div>
            </div>

            <div
              className="d-flex align-items-center mb-3"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#0b0f0d",
                  border: "1px solid #285538",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                📊
              </div>

              <div>
                <div
                  className="fw-semibold"
                  style={{ color: "#ffffff" }}
                >
                  View Your Progress
                </div>

                <small style={{ color: "#89968e" }}>
                  Understand your mood patterns
                </small>
              </div>
            </div>

            <div
              className="d-flex align-items-center"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#0b0f0d",
                  border: "1px solid #285538",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                💡
              </div>

              <div>
                <div
                  className="fw-semibold"
                  style={{ color: "#ffffff" }}
                >
                  Know Yourself
                </div>

                <small style={{ color: "#89968e" }}>
                  Build better self-awareness
                </small>
              </div>
            </div>

          </div>

          {/* Quote */}
          <div
            className="mt-4 pt-4"
            style={{
              borderTop: "1px solid #1d3325",
            }}
          >
            <p
              className="mb-0"
              style={{
                color: "#39ff88",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              "Understand your mood, understand yourself."
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div
          className="col-lg-6"
          style={{
            padding: "50px",
            background: "#111814",
          }}
        >
          {/* Heading */}
          <div className="mb-4">
            <h2
              className="fw-bold mb-2"
              style={{ color: "#ffffff" }}
            >
              Welcome Back
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#89968e",
                fontSize: "14px",
              }}
            >
              Sign in to continue to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4"
              style={{
                background: "#28171b",
                color: "#ff6b81",
                border: "1px solid #4a252d",
                borderRadius: "10px",
                padding: "11px 14px",
                fontSize: "14px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-3">
              <label
                className="form-label fw-semibold"
                style={{ color: "#dce5df" }}
              >
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={{
                  background: "#0b0f0d",
                  color: "#ffffff",
                  border: "1px solid #285538",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label
                className="form-label fw-semibold"
                style={{ color: "#dce5df" }}
              >
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={{
                  background: "#0b0f0d",
                  color: "#ffffff",
                  border: "1px solid #285538",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-4">
              <Link
                to="#"
                className="text-decoration-none"
                style={{
                  color: "#39ff88",
                  fontSize: "13px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Forgot password feature coming soon!");
                }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-100 fw-bold"
              disabled={loading}
              style={{
                background: loading
                  ? "#20a85a"
                  : "#39ff88",
                color: "#050705",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                boxShadow:
                  "0 8px 20px rgba(57, 255, 136, 0.12)",
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.background =
                    "#20c768";
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.background =
                    "#39ff88";
                }
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div
            className="d-flex align-items-center my-4"
            style={{ gap: "12px" }}
          >
            <div
              style={{
                height: "1px",
                background: "#1d3325",
                flex: 1,
              }}
            />

            <span
              style={{
                color: "#89968e",
                fontSize: "12px",
              }}
            >
              OR
            </span>

            <div
              style={{
                height: "1px",
                background: "#1d3325",
                flex: 1,
              }}
            />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-100 fw-semibold"
            onClick={() =>
              alert("Google sign-in will be added soon!")
            }
            style={{
              background: "#0b0f0d",
              color: "#ffffff",
              border: "1px solid #285538",
              borderRadius: "10px",
              padding: "11px",
              fontSize: "14px",
            }}
          >
            <span
              style={{
                marginRight: "8px",
                fontWeight: "bold",
              }}
            >
              G
            </span>
            Sign in with Google
          </button>

          {/* Register */}
          <div className="text-center mt-4">
            <span
              style={{
                color: "#89968e",
                fontSize: "14px",
              }}
            >
              Don't have an account?{" "}
            </span>

            <Link
              to="/register"
              className="text-decoration-none fw-semibold"
              style={{
                color: "#39ff88",
                fontSize: "14px",
              }}
            >
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;

