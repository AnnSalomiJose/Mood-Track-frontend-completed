import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value,});
  };

  const handleRegister = async (e) => { e.preventDefault();

    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 5) {
      setError("Password must contain at least 5  characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/users"
      );

      const existingUser = response.data.find(
        (user) => user.email === email
      );

      if (existingUser) {
        setError("Email already registered");
        return;
      }

      await axios.post(
        "http://localhost:3000/users",
        {
          name,
          email,
          password,
        }
      );

      setSuccess("Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#050705",
        padding: "25px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "#20c768",
          opacity: "0.06",
          borderRadius: "50%",
          filter: "blur(120px)",
          top: "-200px",
          left: "-200px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#39ff88",
          opacity: "0.05",
          borderRadius: "50%",
          filter: "blur(120px)",
          bottom: "-200px",
          right: "-150px",
        }}
      />

      {/* Main Container */}
      <div
        className="container-fluid p-0"
        style={{
          maxWidth: "1150px",
          minHeight: "650px",
          background: "#0b0f0d",
          border: "1px solid #1d3325",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Green Top Line */}
        <div
          style={{
            height: "5px",
            background:
              "linear-gradient(90deg, #20c768, #39ff88, #20c768)",
          }}
        />

        <div className="row g-0">

          {/* ================= LEFT SIDE ================= */}

          <div
            className="col-lg-7 d-flex align-items-center"
            style={{
              minHeight: "645px",
              background:
                "linear-gradient(135deg, #0e1711 0%, #08100b 100%)",
              padding: "55px",
              position: "relative",
              overflow: "hidden",
            }}
          >

            {/* Decorative Circle */}
            <div
              style={{
                position: "absolute",
                width: "280px",
                height: "280px",
                border: "1px solid #1d3325",
                borderRadius: "50%",
                top: "-120px",
                right: "-100px",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                border: "1px solid #285538",
                borderRadius: "50%",
                bottom: "-80px",
                left: "-70px",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                maxWidth: "570px",
              }}
            >            
                <div>
                  <div
                    style={{
                      color: "#39ff88",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    Daily Mood Tracker
                  </div>

                  <small
                    style={{
                      color: "#718078",
                    }}
                  >
                    Your daily wellness companion
                  </small>
                
              </div>

              {/* Heading */}
              <h1
                className="fw-bold mb-4"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  lineHeight: "1.15",
                }}
              >
                Start Your
                <br />

                <span style={{ color: "#39ff88" }}>
                  Mood Journey.
                </span>
              </h1>

              {/* Description */}
              <p
                style={{
                  color: "#89968e",
                  fontSize: "17px",
                  lineHeight: "1.8",
                  maxWidth: "520px",
                }}
              >
                Create your account and begin tracking your
                daily emotions, activities and thoughts.
                Understand your emotional patterns and build
                better self-awareness every day.
              </p>

              {/* Features */}
              <div className="mt-4">

                <div
                  className="d-flex align-items-center mb-3"
                >
                  <span
                    style={{
                      color: "#39ff88",
                      fontSize: "20px",
                      marginRight: "12px",
                    }}
                  >
                    ✓
                  </span>

                  <span
                    style={{
                      color: "#dce5df",
                      fontSize: "15px",
                    }}
                  >
                    Track your daily mood and emotions
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mb-3"
                >
                  <span
                    style={{
                      color: "#39ff88",
                      fontSize: "20px",
                      marginRight: "12px",
                    }}
                  >
                    ✓
                  </span>

                  <span
                    style={{
                      color: "#dce5df",
                      fontSize: "15px",
                    }}
                  >
                    View your mood history and progress
                  </span>
                </div>

                <div
                  className="d-flex align-items-center"
                >
                  <span
                    style={{
                      color: "#39ff88",
                      fontSize: "20px",
                      marginRight: "12px",
                    }}
                  >
                    ✓
                  </span>

                  <span
                    style={{
                      color: "#dce5df",
                      fontSize: "15px",
                    }}
                  >
                    Build awareness of your daily experiences
                  </span>
                </div>

              </div>

              {/* Bottom Text */}
              <div
                className="mt-5 pt-4"
                style={{
                  borderTop: "1px solid #1d3325",
                }}
              >
                <small
                  style={{
                    color: "#718078",
                    letterSpacing: "2px",
                    fontWeight: "600",
                  }}
                >
                  YOUR MOOD • YOUR JOURNEY • YOUR STORY
                </small>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div
            className="col-lg-5 d-flex align-items-center"
            style={{
              minHeight: "645px",
              background: "#111814",
              padding: "45px",
            }}
          >

            <div
              style={{
                width: "100%",
                maxWidth: "430px",
                margin: "0 auto",
              }}
            >

              {/* Heading */}
              <div className="mb-4">

                <h2
                  className="fw-bold mb-2"
                  style={{
                    color: "#ffffff",
                    fontSize: "2rem",
                  }}
                >
                  Create Account
                </h2>

                <p
                  className="mb-0"
                  style={{
                    color: "#89968e",
                    fontSize: "14px",
                  }}
                >
                  Join Daily Mood Tracker and start your journey.
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

              {/* Success */}
              {success && (
                <div
                  className="mb-4"
                  style={{
                    background: "#102619",
                    color: "#39ff88",
                    border: "1px solid #285538",
                    borderRadius: "10px",
                    padding: "11px 14px",
                    fontSize: "14px",
                  }}
                >
                  ✓ {success}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleRegister}>

                {/* Name */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{
                      color: "#dce5df",
                    }}
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      background: "#0b0f0d",
                      color: "#ffffff",
                      border: "1px solid #285538",
                      borderRadius: "10px",
                      padding: "12px 13px",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{
                      color: "#dce5df",
                    }}
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      background: "#0b0f0d",
                      color: "#ffffff",
                      border: "1px solid #285538",
                      borderRadius: "10px",
                      padding: "12px 13px",
                    }}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{
                      color: "#dce5df",
                    }}
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      background: "#0b0f0d",
                      color: "#ffffff",
                      border: "1px solid #285538",
                      borderRadius: "10px",
                      padding: "12px 13px",
                    }}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    style={{
                      color: "#dce5df",
                    }}
                  >
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      background: "#0b0f0d",
                      color: "#ffffff",
                      border: "1px solid #285538",
                      borderRadius: "10px",
                      padding: "12px 13px",
                    }}
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-100 fw-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #20c768, #39ff88)",
                    color: "#050705",
                    border: "none",
                    borderRadius: "10px",
                    padding: "13px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxShadow:
                      "0 8px 25px rgba(57,255,136,0.15)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  Create Account
                </button>

              </form>

              {/* Login */}
              <div className="text-center mt-4">

                <span
                  style={{
                    color: "#89968e",
                    fontSize: "14px",
                  }}
                >
                  Already have an account?{" "}
                </span>

                <Link
                  to="/login"
                  className="text-decoration-none fw-semibold"
                  style={{
                    color: "#39ff88",
                    fontSize: "14px",
                  }}
                >
                  Login
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;



