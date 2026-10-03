
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MoodHistory() {
  const navigate = useNavigate();

  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  const [moods, setMoods] = useState([]);

  // Date Search
  const [searchDate, setSearchDate] = useState("");

  // Mood Search
  const [searchMood, setSearchMood] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Get all moods
  const getMoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/moods");

      const userMoods = response.data.filter(
        (item) => item.userId == loggedUser?.id
      );

      setMoods(userMoods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoods();
  }, []);

  // Delete mood
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/moods/${id}`);

      setMoods(moods.filter((item) => item.id !== id));

      // If current page becomes empty after delete
      const remainingItems = filteredMoods.length - 1;
      const newTotalPages = Math.ceil(remainingItems / itemsPerPage);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by Date + Mood
  const filteredMoods = moods.filter((item) => {
    const moodMatch = searchMood
      ? item.mood?.toLowerCase().includes(searchMood.toLowerCase())
      : true;

    const dateMatch = searchDate
      ? item.date === searchDate
      : true;

    return moodMatch && dateMatch;
  });

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchDate, searchMood]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentMoods = filteredMoods.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    filteredMoods.length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Clear Search
  const handleClearSearch = () => {
    setSearchDate("");
    setSearchMood("");
    setCurrentPage(1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050705",
        color: "#ffffff",
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-dark px-4 py-3"
        style={{
          background: "#050705",
          borderBottom: "1px solid #285538",
        }}
      >
        <div className="container-fluid">
          <span
            className="navbar-brand fw-bold"
            style={{
              fontSize: "1.7rem",
            }}
          >
            💭  Daily{" "}
            <span style={{ color: "#39ff88" }}>
              Mood
            </span>{" "}
            <span style={{ color: "#ffffff" }}>
              Tracker
            </span>
          </span>
           <button
          className="btn"
          onClick={() => navigate("/dashboard")}
          style={{
            color: "#39ff88",
            border: "1px solid #39ff88",
          }}
        >
          ← Dashboard
        </button>
        </div>
        
      </nav>

      {/* Main Content */}
      <div className="container py-5">

        {/* Heading */}
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{
              color: "#39ff88",
            }}
          >
            Mood History
          </h2>

          <p
            style={{
              color: "#8a958e",
            }}
          >
            View and manage your previous mood entries
          </p>
        </div>

        {/* Search Section */}
        <div
          className="p-4 mb-4"
          style={{
            background: "#0b0f0c",
            border: "1px solid #285538",
            borderRadius: "14px",
          }}
        >
          <div className="row g-3 align-items-end">

            {/* Mood Search */}
            <div className="col-md-5">
              <label
                className="form-label fw-semibold"
                style={{
                  color: "#39ff88",
                }}
              >
                Search Mood
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search Happy, Sad, Calm..."
                value={searchMood}
                onChange={(e) =>
                  setSearchMood(e.target.value)
                }
                style={{
                  background: "#111814",
                  color: "#ffffff",
                  border: "1px solid #285538",
                  borderRadius: "9px",
                  padding: "11px",
                }}
              />
            </div>

            {/* Date Search */}
            <div className="col-md-5">
              <label
                className="form-label fw-semibold"
                style={{
                  color: "#39ff88",
                }}
              >
                Search by Date
              </label>

              <input
                type="date"
                className="form-control"
                value={searchDate}
                onChange={(e) =>
                  setSearchDate(e.target.value)
                }
                style={{
                  background: "#111814",
                  color: "#ffffff",
                  border: "1px solid #285538",
                  borderRadius: "9px",
                  padding: "11px",
                  colorScheme: "dark",
                }}
              />
            </div>

            {/* Clear Button */}
            <div className="col-md-2">
              {(searchMood || searchDate) && (
                <button
                  className="btn w-100"
                  onClick={handleClearSearch}
                  style={{
                    background: "#39ff88",
                    color: "#050705",
                    borderRadius: "9px",
                    padding: "11px",
                    fontWeight: "600",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Search Result Text */}
          {(searchMood || searchDate) && (
            <p
              className="mt-3 mb-0"
              style={{
                color: "#8a958e",
              }}
            >
              {searchMood && (
                <>
                  Mood:{" "}
                  <span style={{ color: "#39ff88" }}>
                    {searchMood}
                  </span>
                </>
              )}

              {searchMood && searchDate && " | "}

              {searchDate && (
                <>
                  Date:{" "}
                  <span style={{ color: "#39ff88" }}>
                    {searchDate}
                  </span>
                </>
              )}
            </p>
          )}
        </div>

        {/* Mood Cards */}
        {currentMoods.length > 0 ? (
          currentMoods.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-4"
              style={{
                background: "#0b0f0c",
                border: "1px solid #285538",
                borderRadius: "14px",
              }}
            >
              {/* Mood + Level + Date */}
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">

                <div>
                  <h4
                    className="fw-bold mb-1"
                    style={{
                      color: "#39ff88",
                    }}
                  >
                    😊 {item.mood}
                  </h4>

                  <span
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    Mood Level:{" "}
                    <strong>
                      {item.moodLevel}/5
                    </strong>
                  </span>
                </div>

                <div
                  style={{
                    color: "#8a958e",
                  }}
                >
                  📅 {item.date}
                </div>
              </div>

              {/* Activity */}
              <div className="mb-3">
                <h6
                  className="fw-bold"
                  style={{
                    color: "#39ff88",
                  }}
                >
                  Activity
                </h6>

                <p
                  className="mb-0"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  {item.activity || "No activity added"}
                </p>
              </div>

              {/* Notes */}
              <div className="mb-3">
                <h6
                  className="fw-bold"
                  style={{
                    color: "#39ff88",
                  }}
                >
                  Notes
                </h6>

                <p
                  className="mb-0"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  {item.notes || "No notes added"}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-3">
                <h6
                  className="fw-bold"
                  style={{
                    color: "#39ff88",
                  }}
                >
                  Tags
                </h6>

                <div className="d-flex flex-wrap gap-2">
                  {item.tags ? (
                    item.tags
                      .split(",")
                      .map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: "#102619",
                            color: "#39ff88",
                            border: "1px solid #285538",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            fontSize: "13px",
                          }}
                        >
                          #{tag.trim()}
                        </span>
                      ))
                  ) : (
                    <span
                      style={{
                        color: "#8a958e",
                      }}
                    >
                      No tags added
                    </span>
                  )}
                </div>
              </div>

              {/* Delete */}
              <div className="text-end">
                <button
                  className="btn"
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: "#102619",
                    color: "#ff6b6b",
                    border: "1px solid #285538",
                    borderRadius: "9px",
                    padding: "8px 16px",
                    fontWeight: "600",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-center py-5"
            style={{
              color: "#8a958e",
            }}
          >
            <h5>
              {searchMood || searchDate
                ? "No mood entries found for this search"
                : "No mood entries yet"}
            </h5>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">

              {/* Previous */}
              <button
                className="btn"
                disabled={currentPage === 1}
                onClick={() =>
                  handlePageChange(currentPage - 1)
                }
                style={{
                  background:
                    currentPage === 1
                      ? "#111814"
                      : "#102619",
                  color:
                    currentPage === 1
                      ? "#56635b"
                      : "#39ff88",
                  border: "1px solid #285538",
                  borderRadius: "9px",
                  padding: "8px 14px",
                  fontWeight: "600",
                }}
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className="btn"
                  onClick={() =>
                    handlePageChange(pageNumber)
                  }
                  style={{
                    background:
                      currentPage === pageNumber
                        ? "#39ff88"
                        : "#102619",
                    color:
                      currentPage === pageNumber
                        ? "#050705"
                        : "#39ff88",
                    border: "1px solid #285538",
                    borderRadius: "9px",
                    minWidth: "40px",
                    padding: "8px 12px",
                    fontWeight: "600",
                  }}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next */}
              <button
                className="btn"
                disabled={currentPage === totalPages}
                onClick={() =>
                  handlePageChange(currentPage + 1)
                }
                style={{
                  background:
                    currentPage === totalPages
                      ? "#111814"
                      : "#102619",
                  color:
                    currentPage === totalPages
                      ? "#56635b"
                      : "#39ff88",
                  border: "1px solid #285538",
                  borderRadius: "9px",
                  padding: "8px 14px",
                  fontWeight: "600",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

             
      </div>

      {/* Footer */}
      <footer
        className="text-center py-4 mt-5"
        style={{
          background: "#050705",
          borderTop: "1px solid #285538",
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
              color: "#8a958e",
            }}
          >
            Track your mood • Understand yourself • Build
            self-awareness
          </small>

          <div
            className="mt-2"
            style={{
              color: "#56635b",
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

export default MoodHistory;