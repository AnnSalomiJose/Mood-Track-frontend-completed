
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#0b0f0d",
        color: "#ffffff",
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{
          background: "#050705",
          borderBottom: "1px solid #1d3325",
        }}
      >
        <div className="container py-2">
         <span
  className="navbar-brand fw-bold"
  style={{
    fontSize: "2.5rem",
    fontStyle: "italic",
  }}
>
  💭 {" "}
  <span style={{ color: "#39ff88" }}>
    Daily
  </span>{" "}
  <span style={{ color: "#fdfffe" }}>
    Mood
  </span>{" "}
  <span style={{ color: "#39ff88" }}>
    Tracker
  </span>
</span>

          <div className="d-flex gap-2">
            <button
              className="btn"
              onClick={() => navigate("/login")}
              style={{
                background: "#102619",
                color: "#39ff88",
                border: "1px solid #285538",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              Login
            </button>

            <button
              className="btn"
              onClick={() => navigate("/register")}
              style={{
                background: "#39ff88",
                color: "#050705",
                border: "1px solid #39ff88",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center min-vh-75">

          {/* Left Side */}
          <div className="col-lg-6 text-center text-lg-start">

           

            <h1
              className="display-4 fw-bold mb-3"
              style={{
                color: "#ffffff",
                fontStyle:"italic"
              }}
            >
              Understand Your Mood.
              <br />
              <span style={{ color: "#39ff88" }}>
                Understand Yourself.
              </span>
            </h1>

            <p
              className="lead mb-4"
              style={{
                color: "#89968e",
              }}
            >
              Track your daily emotions, activities and thoughts
              in one simple place. Build awareness and discover
              your emotional journey.
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">

              <button
                className="btn btn-lg px-4"
                onClick={() => navigate("/register")}
                style={{
                  background:
                    "linear-gradient(135deg, #20c768, #39ff88)",
                  color: "#050705",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "700",
                  boxShadow:
                    "0 8px 25px rgba(57,255,136,0.15)",
                }}
              >
                Get Started 
              </button>

              <button
                className="btn btn-lg px-4"
                onClick={() => navigate("/login")}
                style={{
                  background: "#102619",
                  color: "#39ff88",
                  border: "1px solid #285538",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                Login
              </button>

            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 mt-5 mt-lg-0">

            <div
              className="card border-0 shadow-lg rounded-4 p-4 mx-auto"
              style={{
                maxWidth: "450px",
                background: "#111814",
                border: "1px solid #1d3325",
                overflow: "hidden",
              }}
            >

              {/* Green Top Line */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #20c768, #39ff88, #20c768)",
                  margin: "-24px -24px 25px -24px",
                }}
              />

              <div className="text-center">

                <div
                  className="display-1 mb-3"
                >
                  😊
                </div>

                <h3
                  className="fw-bold"
                  style={{
                    color: "#ffffff",
                     fontStyle:"italic"
                  }}
                >
                  How are you feeling today?
                </h3>

                <p
                  style={{
                    color: "#89968e",
                  }}
                >
                  Select your mood and keep track of your day.
                </p>

              </div>

              {/* Mood Options */}
              <div className="row g-3 mt-3">

                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-center"
                    style={{
                      background: "#0b0f0d",
                      border: "1px solid #1d3325",
                    }}
                  >
                    <div className="fs-2">😊</div>
                    <small
                      className="fw-semibold"
                      style={{ color: "#39ff88", fontStyle:"italic" }}
                    >
                      Happy
                    </small>
                  </div>
                </div>

                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-center"
                    style={{
                      background: "#0b0f0d",
                      border: "1px solid #1d3325",
                    }}
                  >
                    <div className="fs-2">😌</div>
                    <small
                      className="fw-semibold"
                      style={{ color: "#39ff88", fontStyle:"italic" }}
                    >
                      Calm
                    </small>
                  </div>
                </div>

                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-center"
                    style={{
                      background: "#0b0f0d",
                      border: "1px solid #1d3325",
                    }}
                  >
                    <div className="fs-2">🤩</div>
                    <small
                      className="fw-semibold"
                      style={{ color: "#39ff88", fontStyle:"italic" }}
                    >
                      Excited
                    </small>
                  </div>
                </div>

                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-center"
                    style={{
                      background: "#0b0f0d",
                      border: "1px solid #1d3325",
                    }}
                  >
                    <div className="fs-2">😐</div>
                    <small
                      className="fw-semibold"
                      style={{ color: "#39ff88", fontStyle:"italic" }}
                    >
                      Neutral
                    </small>
                  </div>
                </div>

                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-center"
                    style={{
                      background: "#0b0f0d",
                      border: "1px solid #1d3325",
                    }}
                  >
                    <div className="fs-2">😢</div>
                    <small
                      className="fw-semibold"
                      style={{ color: "#39ff88", fontStyle:"italic" }}
                    >
                      Sad
                    </small>
                  </div>
                </div>

                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-center"
                    style={{
                      background: "#0b0f0d",
                      border: "1px solid #1d3325",
                    }}
                  >
                    <div className="fs-2">😡</div>
                    <small
                      className="fw-semibold"
                      style={{ color: "#39ff88", fontStyle:"italic" }}
                    >
                      Angry
                    </small>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* About Section */}
<section
  className="container py-5"
  id="about"
>
  <div className="row align-items-center g-4">

    {/* Left Content */}
    <div className="col-lg-6">

      <span
        className="badge px-3 py-2 mb-3 fs-6"
        style={{
           background: "#102619",      
        }}
      >
        💭 About Daily Mood Tracker
      </span>

      <h2
        className="fw-bold mb-3"
        style={{
          color: "#ffffff",
          fontStyle: "italic",
        }}
      >
        A Simple Space to
        <br />
        <span style={{ color: "#39ff88" }}>
          Understand Your Emotions.
        </span>
      </h2>

      <p
        style={{
          color: "#89968e",
          lineHeight: "1.8",
        }}
      >
        Daily Mood Tracker is a simple and personal
        web application designed to help you record
        your daily moods, activities, thoughts and
        experiences in one place.
      </p>

      <p
        style={{
          color: "#89968e",
          lineHeight: "1.8",
        }}
      >
        By keeping track of your emotions over time,
        you can look back at your mood history, notice
        patterns and become more aware of how your
        daily experiences affect you.
      </p>

      <div className="d-flex flex-wrap gap-2 mt-4">

        <span
          className="px-3 py-2 rounded-pill"
          style={{
            background: "#102619",
            color: "#39ff88",
            border: "1px solid #285538",
            fontSize: "13px",
          }}
        >
          📝 Daily Tracking
        </span>

        <span
          className="px-3 py-2 rounded-pill"
          style={{
            background: "#102619",
            color: "#39ff88",
            border: "1px solid #285538",
            fontSize: "13px",
          }}
        >
          📊 Mood Insights
        </span>

        <span
          className="px-3 py-2 rounded-pill"
          style={{
            background: "#102619",
            color: "#39ff88",
            border: "1px solid #285538",
            fontSize: "13px",
          }}
        >
          🔒 Personal Space
        </span>

      </div>
    </div>

    {/* Right Content */}
    <div className="col-lg-6">

      <div
        className="p-4 p-md-5 rounded-4"
        style={{
          background: "#111814",
          border: "1px solid #1d3325",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >

        <div className="row g-3">

          <div className="col-6">
            <div
              className="p-4 text-center rounded-4"
              style={{
                background: "#0b0f0d",
                border: "1px solid #1d3325",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                }}
              >
                😊
              </div>

              <h5
                className="mt-2 mb-1 fw-bold"
                style={{
                  color: "#39ff88",
                }}
              >
                Your Mood
              </h5>

              <small
                style={{
                  color: "#89968e",
                }}
              >
                Record how you feel
              </small>
            </div>
          </div>

          <div className="col-6">
            <div
              className="p-4 text-center rounded-4"
              style={{
                background: "#0b0f0d",
                border: "1px solid #1d3325",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                }}
              >
                📝
              </div>

              <h5
                className="mt-2 mb-1 fw-bold"
                style={{
                  color: "#39ff88",
                }}
              >
                Your Thoughts
              </h5>

              <small
                style={{
                  color: "#89968e",
                }}
              >
                Keep your daily notes
              </small>
            </div>
          </div>

          <div className="col-6">
            <div
              className="p-4 text-center rounded-4"
              style={{
                background: "#0b0f0d",
                border: "1px solid #1d3325",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                }}
              >
                📅
              </div>

              <h5
                className="mt-2 mb-1 fw-bold"
                style={{
                  color: "#39ff88",
                }}
              >
                Your History
              </h5>

              <small
                style={{
                  color: "#89968e",
                }}
              >
                Look back anytime
              </small>
            </div>
          </div>

          <div className="col-6">
            <div
              className="p-4 text-center rounded-4"
              style={{
                background: "#0b0f0d",
                border: "1px solid #1d3325",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                }}
              >
                📈
              </div>

              <h5
                className="mt-2 mb-1 fw-bold"
                style={{
                  color: "#39ff88",
                }}
              >
                Your Progress
              </h5>

              <small
                style={{
                  color: "#89968e",
                }}
              >
                Understand patterns
              </small>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</section>

      {/* Features */}
      <section className="container pb-5">

        <div className="text-center mb-4 ">

          <h2
            className="fw-bold"
            style={{
              color: "#ffffff",
               fontStyle:"italic"
            }}
          >
            Why Use Daily
            <span className="ms-2"  style={{ color: "#39ff88"  }}>
           Mood Tracker?
      </span>
          </h2>
           

          <p
            style={{
              color: "#89968e",
            }}
          >
            Simple tools to help you understand your daily emotions.
          </p>

        </div>

        <div className="row g-4">

          {/* Feature 1 */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm h-100 text-center p-4"
              style={{
                background: "#111814",
                border: "1px solid #1d3325",
                borderRadius: "18px",
              }}
            >

              <div
                className="display-5 mb-3"
                style={{
                  color: "#39ff88",
                }}
              >
                📝
              </div>

              <h5
                className="fw-bold"
                style={{ color: "#ffffff" }}
              >
                Track Your Mood
              </h5>

              <p
                className="mb-0"
                style={{ color: "#89968e" }}
              >
                Record how you feel every day and keep
                your mood information organized.
              </p>

            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm h-100 text-center p-4"
              style={{
                background: "#111814",
                border: "1px solid #1d3325",
                borderRadius: "18px",
              }}
            >

              <div
                className="display-5 mb-3"
                style={{
                  color: "#39ff88",
                }}
              >
                📊
              </div>

              <h5
                className="fw-bold"
                style={{ color: "#ffffff" }}
              >
                View Your Progress
              </h5>

              <p
                className="mb-0"
                style={{ color: "#89968e" }}
              >
                View your mood history and understand
                your emotional patterns.
              </p>

            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm h-100 text-center p-4"
              style={{
                background: "#111814",
                border: "1px solid #1d3325",
                borderRadius: "18px",
              }}
            >

              <div
                className="display-5 mb-3"
                style={{
                  color: "#39ff88",
                }}
              >
                💡
              </div>

              <h5
                className="fw-bold"
                style={{ color: "#ffffff" }}
              >
                Know Yourself
              </h5>

              <p
                className="mb-0"
                style={{ color: "#89968e" }}
              >
                Build awareness of your emotions,
                activities and daily experiences.
              </p>

            </div>
          </div>

        </div>
      </section>
      {/* FAQ Section */}
<section
  className="container py-5"
  id="faq"
>
  <div className="text-center mb-4">

    <span
      className="badge px-3 py-2 mb-3 fs-6"
      style={{
        background: "#102619",
        
      }}
    >
     Frequently Asked Questions
    </span>

    <h2
      className="fw-bold"
      style={{
        color: "#ffffff",
        fontStyle: "italic",
      }}
    >
      Questions About{" "}
      <span style={{ color: "#39ff88" }}>
        Mood Tracker?
      </span>
    </h2>

    <p
      style={{
        color: "#89968e",
      }}
    >
      Here are some common questions about the application.
    </p>

  </div>

  <div
    className="accordion"
    id="moodTrackerFAQ"
  >

    {/* FAQ 1 */}
    <div
      className="accordion-item mb-3"
      style={{
        background: "#111814",
        border: "1px solid #1d3325",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqOne"
          style={{
            background: "#111814",
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          💭 What is Daily Mood Tracker?
        </button>
      </h2>

      <div
        id="faqOne"
        className="accordion-collapse collapse"
        data-bs-parent="#moodTrackerFAQ"
      >
        <div
          className="accordion-body"
          style={{
            background: "#0b0f0d",
            color: "#89968e",
            lineHeight: "1.7",
          }}
        >
          Daily Mood Tracker is a web application that
          helps you record your daily mood, activities,
          thoughts and experiences and view your mood
          history over time.
        </div>
      </div>
    </div>

    {/* FAQ 2 */}
    <div
      className="accordion-item mb-3"
      style={{
        background: "#111814",
        border: "1px solid #1d3325",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqTwo"
          style={{
            background: "#111814",
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          📝 What can I record?
        </button>
      </h2>

      <div
        id="faqTwo"
        className="accordion-collapse collapse"
        data-bs-parent="#moodTrackerFAQ"
      >
        <div
          className="accordion-body"
          style={{
            background: "#0b0f0d",
            color: "#89968e",
            lineHeight: "1.7",
          }}
        >
          You can record your mood, mood level,
          activities, personal notes and tags for
          each day.
        </div>
      </div>
    </div>

    {/* FAQ 3 */}
    <div
      className="accordion-item mb-3"
      style={{
        background: "#111814",
        border: "1px solid #1d3325",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqThree"
          style={{
            background: "#111814",
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          📊 Can I see my mood history?
        </button>
      </h2>

      <div
        id="faqThree"
        className="accordion-collapse collapse"
        data-bs-parent="#moodTrackerFAQ"
      >
        <div
          className="accordion-body"
          style={{
            background: "#0b0f0d",
            color: "#89968e",
            lineHeight: "1.7",
          }}
        >
          Yes. Your saved mood entries can be viewed
          through the mood history section along with
          your mood patterns and records.
        </div>
      </div>
    </div>

    {/* FAQ 4 */}
    <div
      className="accordion-item mb-3"
      style={{
        background: "#111814",
        border: "1px solid #1d3325",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqFour"
          style={{
            background: "#111814",
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          📄 Can I download my mood reports?
        </button>
      </h2>

      <div
        id="faqFour"
        className="accordion-collapse collapse"
        data-bs-parent="#moodTrackerFAQ"
      >
        <div
          className="accordion-body"
          style={{
            background: "#0b0f0d",
            color: "#89968e",
            lineHeight: "1.7",
          }}
        >
          Yes. You can generate and download your mood
          reports as PDF files and access your previous
          downloads from the application.
        </div>
      </div>
    </div>

  </div>
</section>

      {/* Bottom CTA */}
      <section
        className="text-center py-5"
        style={{
          background: "#050705",
          borderTop: "1px solid #1d3325",
          borderBottom: "1px solid #1d3325",
        }}
      >

        <div className="container">

          <h2
            className="fw-bold mb-3"
            style={{ color: "#ffffff", fontStyle:"italic" }}
          >
            Start Tracking Your Mood Today{" "}
            <span style={{ color: "#39ff88" }}>💭</span>
          </h2>

          <p
            className="mb-4"
            style={{ color: "#89968e" }}
          >
            Begin your journey towards better self-awareness.
          </p>

          <button
            className="btn btn-lg px-5"
            onClick={() => navigate("/register")}
            style={{
              background: "#39ff88",
              color: "#050705",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
            }}
          >
            Create Account
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-white text-center py-3"
        style={{
          background: "#050705",
        }}
      >

         <div>
        <small style={{ color: "#ffffff" }}>
            Developed with ❤️ using React
        </small>
        </div>
         <div>
        <small style={{ color: "#fbfbfb" }}>
            BY ANN SALOMI JOSE
        </small>
        </div>

        <small style={{ color: "#718078" }}>
          © 2026 Daily Mood Tracker. All Rights Reserved.
        </small>
        <div>
        <small style={{ color: "#718078" }}>
             Track your daily mood, activities, notes, and mood history in one place.
        </small>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;