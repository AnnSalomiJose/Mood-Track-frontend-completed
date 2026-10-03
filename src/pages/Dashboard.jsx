
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ChartComponent from "../components/ChartComponent";
import { addMoodAPI, getMoodsAPI, deleteMoodAPI, updateMoodAPI,} from "../../services/apiServices";



function Dashboard() {
  const loggedUser = JSON.parse(
    sessionStorage.getItem("loggedUser")
  );

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [darkMode, setDarkMode] = useState(true);

  const [moodData, setMoodData] = useState({
    date: "",
    mood: "",
    moodLevel: "",
    activity: "",
    notes: "",
    tags: "",
  });

  const [moods, setMoods] = useState([]);

  

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });
  }, []);

  const getMoods = async () => {
    try {
      const response = await getMoodsAPI();

      const userMoods = response.data.filter(
        (item) => item.userId == loggedUser.id
      );

      setMoods(userMoods);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };

  useEffect(() => {
    getMoods();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setMoodData({...moodData,[name]: value,});
  };

  //  EDIT MOOD =================

  const handleEditMood = (item) => {
    setMoodData({
      date: item.date,
      mood: item.mood,
      moodLevel: item.moodLevel,
      activity: item.activity,
      notes: item.notes,
      tags: item.tags || "",
    });

    setEditId(item.id);
    setShowForm(true);

    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  //  SAVE / UPDATE 

  const handleSaveMood = async () => {
    if (
      !moodData.date ||
      !moodData.mood ||
      !moodData.moodLevel ||
      !moodData.activity ||
      !moodData.notes
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const data = {
        ...moodData,
        userId: loggedUser.id,
        moodLevel: Number(moodData.moodLevel),
      };

      if (editId) {
        await updateMoodAPI(editId, data);

        alert("Mood updated successfully!");
      } else {
        await addMoodAPI(data);

        alert("Mood saved successfully!");
      }

      getMoods();

      setMoodData({
        date: "",
        mood: "",
        moodLevel: "",
        activity: "",
        notes: "",
        tags: "",
      });

      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving/updating mood:", error);

      alert("Something went wrong.");
    }
  };

  //  DELETE MOOD 

  const handleDeleteMood = async (id) => {
    try {
      await deleteMoodAPI(id);

      alert("Mood deleted successfully! ");

      getMoods();
    } catch (error) {
      console.error("Error deleting mood:", error);

      alert("Something went wrong while deleting mood.");
    }
  };

  // CANCEL 

  const handleCancel = () => {
    setMoodData({
      date: "",
      mood: "",
      moodLevel: "",
      activity: "",
      notes: "",
      tags: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedUser");

    navigate("/login");
  };

  const averageMood =
    moods.length > 0
      ? (
          moods.reduce(
            (total, item) =>
              total + Number(item.moodLevel),
            0
          ) / moods.length
        ).toFixed(1)
      : "0.0";

  const todaysMood =
    moods.length > 0
      ? moods[moods.length - 1].mood
      : "No mood";
  const bgColor = darkMode ? "#0b0f0d" : "#f4f7f5";

  const cardColor = darkMode ? "#111814" : "#ffffff";

  const textColor = darkMode ? "#ffffff" : "#17221b";

  const mutedColor = darkMode ? "#89968e" : "#6c7570";

  const borderColor = darkMode
    ? "#1d3325"
    : "#dce7df";

  const inputBg = darkMode ? "#0b0f0d" : "#ffffff";

  const inputText = darkMode ? "#ffffff" : "#17221b";

  return (
    <div
      className="min-vh-100"
      style={{
        background: bgColor,
        color: textColor,
        transition: "all 0.3s ease",
      }}
    >

     
      {/*  navbar */}
    
      <nav
        className="navbar sticky-top"
        style={{
          background: darkMode
            ? "#050705"
            : "#ffffff",
          borderBottom: `1px solid ${borderColor}`,
          transition: "all 0.3s ease",
        }}
      >
        <div className="container py-2">

          <div className="d-flex align-items-center justify-content-between w-100">


            <span
              className="navbar-brand fw-bold mb-0"
              style={{
                color: "#39ff88",
                fontSize: "2.35rem",
                fontStyle:"italic"
              }}
            >
              💭 Daily Mood Tracker
            </span>

            <div
              className="d-flex align-items-center gap-2 gap-md-3"
              style={{
                paddingTop: "5px",
              }}
            >
               <span
                className="d-none d-md-block fw-semibold"
                style={{
                  color: mutedColor,
                  whiteSpace: "nowrap",
                }}
              >
                Hey! {loggedUser?.name} 
              </span>
              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                title={
                  darkMode
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
                style={{
                  width: "48px",
                  height: "30px",
                  borderRadius: "20px",
                  border: darkMode
                    ? "1px solid #39ff88"
                    : "1px solid #20a85a",
                  background: darkMode
                    ? "#102619"
                    : "#e8f8ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: darkMode
                    ? "flex-end"
                    : "flex-start",
                  padding: "2px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              >

                <span
                  style={{
                    width: "23px",
                    height: "23px",
                    borderRadius: "50%",
                    background: darkMode
                    ? "#39ff88"
                      : "#20a85a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {darkMode ? "🌙" : "☀️"}
                </span>

              </button>
              {/* logout */}
              <button
                className="btn btn-sm"
                onClick={handleLogout}
                style={{
                  background: darkMode
                    ? "#28171b"
                    : "#fff0f2",
                  color: "#ff6b81",
                  border: `1px solid ${
                    darkMode
                      ? "#4a252d"
                      : "#f4c6ce"
                  }`,
                  borderRadius: "10px",
                  padding: "8px 15px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </nav>

      <div className="container pt-4">

        <div className="d-flex justify-content-end gap-2">

          {/* DOWNLOADS  */}

          <button
            className="btn btn-sm"
            onClick={() => navigate("/downloads")}
            style={{
              background: darkMode
                ? "#102619"
                : "#e8f8ee",
              color: "#39ff88",
              border: `1px solid ${
                darkMode
                  ? "#285538"
                  : "#b8e5c9"
              }`,
              borderRadius: "10px",
              padding: "9px 16px",
              fontWeight: "600",
            }}
          >
            📄 Downloads
          </button>


          {/*  ALL DOWNLOADS  */}

          <button
            className="btn btn-sm"
            onClick={() =>
              navigate("/all-downloads")
            }
            style={{
              background: darkMode
                ? "#102619"
                : "#e8f8ee",
              color: "#39ff88",
              border: `1px solid ${
                darkMode
                  ? "#285538"
                  : "#b8e5c9"
              }`,
              borderRadius: "10px",
              padding: "9px 16px",
              fontWeight: "600",
            }}
          >
            📁 All Downloads
          </button>

        </div>

      </div>
     

      <div className="container py-5">

        <div
          className="mb-5"
          data-aos="fade-down"
        >
          <h1
            className="fw-bold"
            style={{
              color: textColor,
              fontSize: "2.5rem",
              fontStyle:"italic"
            }}
          >
            Welcome back, {loggedUser?.name} ! 
          </h1>

          <p
            style={{
              color: mutedColor,
              fontSize: "1.05rem",
            }}
          >
            Take a moment to check in with yourself
            and understand your emotional journey.
          </p>

        </div>
       
        <div className="row g-4 mb-5">

          {/* Today's Mood */}

          <div
            className="col-md-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >

            <div
              className="card border-0 h-100"
              style={{
                background: cardColor,
                borderRadius: "20px",
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode
                  ? "0 10px 30px rgba(0,0,0,0.35)"
                  : "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p
                      className="mb-2"
                      style={{
                        color: mutedColor,
                      }}
                    >
                      Today's Mood
                    </p>

                    <h3
                      className="fw-bold mb-0"
                      style={{
                        color: "#39d98a",
                      }}
                    >
                      {todaysMood}
                    </h3>

                  </div>

                  <div
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "16px",
                      background: darkMode
                        ? "#102619"
                        : "#e8f8ee",
                      border: `1px solid ${
                        darkMode
                          ? "#285538"
                          : "#b8e5c9"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                    }}
                  >
                    😊
                  </div>

                </div>

              </div>

            </div>

          </div>



          <div
            className="col-md-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >

            <div
              className="card border-0 h-100"
              style={{
                background: cardColor,
                borderRadius: "20px",
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode
                  ? "0 10px 30px rgba(0,0,0,0.35)"
                  : "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p
                      className="mb-2"
                      style={{
                        color: mutedColor,
                      }}
                    >
                      Total Entries
                    </p>

                    <h3
                      className="fw-bold mb-0"
                      style={{
                        color: textColor,
                      }}
                    >
                      {moods.length}
                    </h3>

                  </div>

                  <div
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "16px",
                      background: darkMode
                        ? "#102619"
                        : "#e8f8ee",
                      border: `1px solid ${
                        darkMode
                          ? "#285538"
                          : "#b8e5c9"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                    }}
                  >
                    📊
                  </div>

                </div>

              </div>

            </div>

          </div>

      

          <div
            className="col-md-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >

            <div
              className="card border-0 h-100"
              style={{
                background: cardColor,
                borderRadius: "20px",
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode
                  ? "0 10px 30px rgba(0,0,0,0.35)"
                  : "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p
                      className="mb-2"
                      style={{
                        color: mutedColor,
                      }}
                    >
                      Average Mood
                    </p>

                    <h3
                      className="fw-bold mb-0"
                      style={{
                        color: textColor,
                      }}
                    >
                      {averageMood}

                      <span
                        className="fs-6"
                        style={{
                          color: mutedColor,
                        }}
                      >
                        {" "} / 5
                      </span>

                    </h3>

                  </div>

                  <div
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "16px",
                      background: darkMode
                        ? "#102619"
                        : "#e8f8ee",
                      border: `1px solid ${
                        darkMode
                          ? "#285538"
                          : "#b8e5c9"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                    }}
                  >
                    💚
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


    
        <div
          className="card border-0 mb-5"
          data-aos="fade-up"
          style={{
            background: cardColor,
            borderRadius: "22px",
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode
              ? "0 15px 40px rgba(2, 2, 2, 0.35)"
              : "0 15px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >

          {/* Green Line */}

          <div
            style={{
              height: "5px",
              background:
                "linear-gradient(90deg, #20c768, #39ff88, #20c768)",
            }}
          />

          <div className="card-body p-4 p-md-5">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h4
                  className="fw-bold mb-2"
                  style={{
                    color: textColor,
                    fontStyle:"italic"
                  }}
                >
                  Track Your Mood
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: mutedColor,
                  }}
                >
                  How are you feeling today?
                </p>

              </div>

              <button
                className="btn"
                onClick={() => {
                  if (showForm) {
                    handleCancel();
                  } else {
                    setShowForm(true);
                  }
                }}
                style={{
                  background:
                    "linear-gradient(135deg, #20c768, #39ff88)",
                  color: "#06100a",
                  border: "none",
                  borderRadius: "11px",
                  padding: "10px 18px",
                  fontWeight: "700",
                  boxShadow:
                    "0 7px 20px rgba(57,255,136,0.18)",
                }}
              >
                {showForm
                  ? "Close Form"
                  : "+ Add Today's Mood"}
              </button>

            </div>



            {showForm && (

              <div
                className="mt-4 pt-4"
                data-aos="fade-down"
              >

                <div className="row g-4">

                  {/* Date */}

                  <div className="col-md-6">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: textColor,
                      }}
                    >
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      
                      value={moodData.date}
                      onChange={handleChange}
                      style={{
                        background: inputBg,
                        color: inputText,
                        // colorScheme: "dark",
                        border: `1px solid ${borderColor}`,
                        borderRadius: "11px",
                        padding: "11px",
                      }}
                    />

                  </div>


                  {/* Mood */}

                  <div className="col-md-6">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: textColor,
                      }}
                    >
                      Mood / Emotion
                    </label>

                    <select
                      name="mood"
                      className="form-select"
                      value={moodData.mood}
                      onChange={handleChange}
                      style={{
                        background: inputBg,
                        color: inputText,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "11px",
                        padding: "11px",
                      }}
                    >

                      <option value="">
                        Select Mood
                      </option>

                      <option value="Happy">
                        Happy 😊
                      </option>

                      <option value="Sad">
                        Sad 😢
                      </option>

                      <option value="Angry">
                        Angry 😡
                      </option>

                      <option value="Neutral">
                        Neutral 😐
                      </option>

                      <option value="Excited">
                        Excited 🤩
                      </option>

                      <option value="Calm">
                        Calm 😌
                      </option>

                    </select>

                  </div>


                  {/* Mood Level */}

                  <div className="col-md-6">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: textColor,
                      }}
                    >
                      Mood Level
                    </label>

                    <select
                      name="moodLevel"
                      className="form-select"
                      value={moodData.moodLevel}
                      onChange={handleChange}
                      style={{
                        background: inputBg,
                        color: inputText,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "11px",
                        padding: "11px",
                      }}
                    >

                      <option value="">
                        Select Mood Level
                      </option>

                      <option value="1">
                        1 / 5
                      </option>

                      <option value="2">
                        2 / 5
                      </option>

                      <option value="3">
                        3 / 5
                      </option>

                      <option value="4">
                        4 / 5
                      </option>

                      <option value="5">
                        5 / 5
                      </option>

                    </select>

                  </div>


                  {/* Activity */}

                  <div className="col-md-6">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: textColor,
                      }}
                    >
                      Activity
                    </label>

                    <input
                      type="text"
                      name="activity"
                      className="form-control"
                      placeholder="What did you do today?"
                      value={moodData.activity}
                      onChange={handleChange}
                      style={{
                        background: inputBg,
                        color: inputText,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "11px",
                        padding: "11px",
                      }}
                    />

                  </div>


                  {/* Notes */}

                  <div className="col-md-6">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: textColor,
                      }}
                    >
                      Notes
                    </label>

                    <textarea
                      name="notes"
                      className="form-control"
                      rows="3"
                      placeholder="Write something about your day..."
                      value={moodData.notes}
                      onChange={handleChange}
                      style={{
                        background: inputBg,
                        color: inputText,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "11px",
                      }}
                    ></textarea>

                  </div>


                  {/* Tags */}

                  <div className="col-md-6">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: textColor,
                      }}
                    >
                      Tags
                    </label>

                    <input
                      type="text"
                      name="tags"
                      className="form-control"
                      placeholder="Example: study, work, friends"
                      value={moodData.tags}
                      onChange={handleChange}
                      style={{
                        background: inputBg,
                        color: inputText,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "11px",
                        padding: "11px",
                      }}
                    />

                  </div>

                </div>


                {/* Buttons */}

                <div className="mt-4 d-flex gap-2">

                  <button
                    className="btn"
                    onClick={handleSaveMood}
                    style={{
                      background:
                        "linear-gradient(135deg, #20c768, #39ff88)",
                      color: "#06100a",
                      border: "none",
                      borderRadius: "11px",
                      padding: "10px 20px",
                      fontWeight: "700",
                    }}
                  >
                    {editId
                      ? "Update Mood"
                      : "Save Mood"}
                  </button>

                  <button
                    className="btn"
                    onClick={handleCancel}
                    style={{
                      background: darkMode
                        ? "#202923"
                        : "#e9eeeb",
                      color: darkMode
                        ? "#c5d0c8"
                        : "#425047",
                      border: `1px solid ${borderColor}`,
                      borderRadius: "11px",
                      padding: "10px 20px",
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

        

        <div
          className="d-flex justify-content-between align-items-center mb-3"
          data-aos="fade-right"
        >

          <div>

            <h4
              className="fw-bold mb-1"
              style={{
                color: textColor,
                fontStyle:"italic"
              }}
            >
              Mood Overview
            </h4>

            <p
              className="mb-0"
              style={{
                color: mutedColor,
              }}
            >
              Your emotional journey at a glance
            </p>

          </div>

          <button
            className="btn btn-sm"
            onClick={() =>
              navigate("/mood-history")
            }
            style={{
              background: darkMode
                ? "#102619"
                : "#e8f8ee",
              color: "#20a85a",
              border: `1px solid ${
                darkMode
                  ? "#285538"
                  : "#b8e5c9"
              }`,
              borderRadius: "10px",
              padding: "9px 16px",
              fontWeight: "600",
            }}
          >
            View History →
          </button>

        </div>


   
       

        <div
          className="card border-0 mb-5"
          data-aos="zoom-in"
          style={{
            background: cardColor,
            borderRadius: "20px",
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode
              ? "0 12px 35px rgba(0,0,0,0.35)"
              : "0 12px 35px rgba(0,0,0,0.08)",
          }}
        >

          <div className="card-body p-4">

            <ChartComponent moods={moods} />

          </div>

        </div>


       

        <div
          className="mb-4"
          data-aos="fade-right"
        >

          <h4
            className="fw-bold mb-1"
            style={{
              color: textColor,
              fontStyle:"italic"

            }}
          >
            Recent Mood History
          </h4>

          <p
            style={{
              color: mutedColor,
            }}
          >
            Your latest mood entries
          </p>

        </div>


        
      

        {moods.length === 0 ? (

          <div
            className="card border-0 text-center"
            data-aos="fade-up"
            style={{
              background: cardColor,
              borderRadius: "20px",
              border: `1px solid ${borderColor}`,
            }}
          >

            <div className="card-body py-5">

              <div
                style={{
                  fontSize: "4rem",
                }}
              >
                📝
              </div>

              <h5
                className="mt-3 fw-bold"
                style={{
                  color: textColor,
                }}
              >
                No mood entries yet
              </h5>

              <p
                className="mb-0"
                style={{
                  color: mutedColor,
                }}
              >
                Start tracking your mood to see your
                emotional journey here.
              </p>

            </div>

          </div>

        ) : (

          <div className="row g-4">

            {moods.map((item, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
              >

                <div
                  className="card border-0 h-100"
                  style={{
                    background: cardColor,
                    borderRadius: "20px",
                    border: `1px solid ${borderColor}`,
                    boxShadow: darkMode
                      ? "0 12px 30px rgba(0,0,0,0.3)"
                      : "0 12px 30px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                  }}
                >

                  <div className="card-body p-4">

                    {/* Mood Header */}

                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <div>

                        <h5
                          className="fw-bold mb-1"
                          style={{
                            color: textColor,
                          }}
                        >
                          {item.mood}
                        </h5>

                        <small
                          style={{
                            color: mutedColor,
                          }}
                        >
                          📅 {item.date}
                        </small>

                      </div>

                      <span
                        className="badge"
                        style={{
                          background: darkMode
                            ? "#102619"
                            : "#e8f8ee",
                          color: "#20a85a",
                          border: `1px solid ${
                            darkMode
                              ? "#285538"
                              : "#b8e5c9"
                          }`,
                          borderRadius: "9px",
                          padding: "8px 11px",
                        }}
                      >
                        {item.moodLevel}/5
                      </span>

                    </div>


                    {/* Activity */}

                    <div
                      className="p-3 mb-3"
                      style={{
                        background: darkMode
                          ? "#0b0f0d"
                          : "#f4f8f5",
                        borderRadius: "13px",
                        border: `1px solid ${borderColor}`,
                      }}
                    >

                      <small
                        className="d-block mb-1"
                        style={{
                          color: mutedColor,
                        }}
                      >
                        Activity
                      </small>

                      <span
                        className="fw-semibold"
                        style={{
                          color: textColor,
                        }}
                      >
                        💼 {item.activity}
                      </span>

                    </div>


                    {/* Notes */}

                    <p
                      className="mb-3"
                      style={{
                        color: mutedColor,
                      }}
                    >
                      📝 {item.notes}
                    </p>


                    {/* Tags */}

                    {item.tags && (

                      <div className="mb-3">

                        {item.tags
                          .split(",")
                          .map((tag, tagIndex) => (

                            <span
                              key={tagIndex}
                              className="badge me-1 mb-1"
                              style={{
                                background: darkMode
                                  ? "#14291c"
                                  : "#e8f8ee",
                                color: "#20a85a",
                                border: `1px solid ${
                                  darkMode
                                    ? "#285538"
                                    : "#b8e5c9"
                                }`,
                                borderRadius: "7px",
                                padding: "6px 9px",
                              }}
                            >
                              #{tag.trim()}
                            </span>

                          ))}

                      </div>

                    )}


                    {/* Buttons */}

                    <div className="d-flex gap-2 mt-3">

                      {/* Edit */}

                      <button
                        className="btn btn-sm flex-fill"
                        onClick={() =>
                          handleEditMood(item)
                        }
                        style={{
                          background: darkMode
                            ? "#27301a"
                            : "#f0f5d9",
                          color: "#9aad24",
                          border: `1px solid ${
                            darkMode
                              ? "#4b5528"
                              : "#d8e5a2"
                          }`,
                          borderRadius: "9px",
                          fontWeight: "600",
                        }}
                      >
                         Edit
                      </button>


                      {/* Delete */}

                      <button
                        className="btn btn-sm flex-fill"
                        onClick={() =>
                          handleDeleteMood(item.id)
                        }
                        style={{
                          background: darkMode
                            ? "#28171b"
                            : "#fff0f2",
                          color: "#e45c70",
                          border: `1px solid ${
                            darkMode
                              ? "#4a252d"
                              : "#f4c6ce"
                          }`,
                          borderRadius: "9px",
                          fontWeight: "600",
                        }}
                      >
                         Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
      

      <footer
        className="text-center py-4 mt-5"
        style={{
          background: darkMode
            ? "#050705"
            : "#ffffff",
          borderTop: `1px solid ${borderColor}`,
          transition: "all 0.3s ease",
        }}
      >
        <div className="container">

          <div
            className="fw-bold mb-2"
            style={{
              color: "#39ff88",
              fontSize: "1.1rem",
            }}
          >
            💭 Daily Mood Tracker
          </div>

          <small
            style={{
              color: mutedColor,
            }}
          >
            Track your mood • Understand yourself •
            Build self-awareness
          </small>

          <div
            className="mt-2"
            style={{
              color: darkMode
                ? "#56635b"
                : "#8a958e",
              fontSize: "13px",
            }}
          >
            © 2026 Daily Mood Tracker. All Rights Reserved.
          </div>

        </div>
      </footer>
    </div>
  );
  
}

export default Dashboard;



