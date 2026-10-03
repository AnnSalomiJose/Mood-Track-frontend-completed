import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

import {getMoodsAPI,addDownloadAPI,getDownloadsAPI,deleteDownloadAPI,} from "../../services/apiServices";

function Download() {
  const loggedUser = JSON.parse(
    sessionStorage.getItem("loggedUser")
  );

  const [moods, setMoods] = useState([]);
  const [downloads, setDownloads] = useState([]);

  const navigate = useNavigate();

  // Get user's moods
  const getMoods = async () => {
    try {
      const response = await getMoodsAPI();

      const userMoods = response.data.filter(
        (item) => item.userId === loggedUser?.id
      );

      setMoods(userMoods);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };

  // Get user's downloads
  const getDownloads = async () => {
    try {
      const response = await getDownloadsAPI();

      const userDownloads = response.data.filter(
        (item) => item.userId === loggedUser?.id
      );

      setDownloads(userDownloads);
    } catch (error) {
      console.error("Error fetching downloads:", error);
    }
  };

  // Download one mood as one PDF
  const handleDownloadPDF = async (mood) => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text("Daily Mood Tracker", 20, 20);

      doc.setFontSize(14);
      doc.text("Mood Report", 20, 32);

      let y = 50;

      doc.setFontSize(12);

      doc.text(`Date: ${mood.date}`, 20, y);
      y += 10;

      doc.text(`Mood: ${mood.mood}`, 20, y);
      y += 10;

      doc.text(`Mood Level: ${mood.moodLevel}/5`, 20, y);
      y += 10;

      doc.text(`Activity: ${mood.activity || "None"}`, 20, y);
      y += 10;

      doc.text(`Notes: ${mood.notes || "None"}`, 20, y);
      y += 10;

      doc.text(`Tags: ${mood.tags || "None"}`, 20, y);

      const fileName = `Mood-Report-${mood.date}.pdf`;

      const pdfData = doc.output("datauristring");

      doc.save(fileName);

      const now = new Date();

      const downloadData = {
        userId: loggedUser.id,
        fileName: fileName,
        moodId: mood.id,
        moodDate: mood.date,
        mood: mood.mood,
        moodLevel: mood.moodLevel,
        activity: mood.activity || "",
        notes: mood.notes || "",
        tags: mood.tags || "",
        downloadDate: now.toLocaleDateString(),
        downloadTime: now.toLocaleTimeString(),
        pdfData: pdfData,
      };

      await addDownloadAPI(downloadData);

      await getDownloads();

      alert("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF download error:", error);

      alert("Something went wrong while downloading.");
    }
  };

  // Delete download
  const handleDelete = async (id) => {
    try {
      await deleteDownloadAPI(id);

      await getDownloads();

      alert("Download deleted successfully!");
    } catch (error) {
      console.error("Error deleting download:", error);

      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    if (loggedUser?.id) {
      getMoods();
      getDownloads();
    }
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "#0b0f0d",
        color: "white",
      }}
    >
      {/* Navbar */}
      <nav
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          background: "#050705",
          borderBottom: "1px solid #39ff88",
        }}
      >
        <h4
          className="m-0"
          style={{
            color: "#39ff88",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          💭 Daily Mood Tracker
        </h4>

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
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container py-5">

          {/* Heading */}
          <div className="text-center mb-5">
            <h2
              style={{
                color: "#39ff88",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              DOWNLOAD MOOD REPORTS
            </h2>

            <p className="text-secondary">
              Download each mood as a separate PDF report
            </p>
          </div>

          {/* Mood Cards */}
          {moods.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-secondary">
                No mood history available
              </h5>
            </div>
          ) : (
            <div className="row g-4">

              {moods.map((mood) => (
                <div
                  className="col-md-6 col-lg-4"
                  key={mood.id}
                >
                  <div
                    className="card h-100"
                    style={{
                      background: "#111814",
                      border: "1px solid #1d3325",
                      borderRadius: "18px",
                      color: "white",
                    }}
                  >
                    <div className="card-body p-4">

                      <h5
                        style={{
                          color: "#39ff88",
                          fontStyle: "italic",
                        }}
                      >
                        {mood.date}
                      </h5>

                      <hr
                        style={{
                          borderColor: "#294532",
                        }}
                      />

                      <p>
                        <strong>Mood:</strong>{" "}
                        {mood.mood}
                      </p>

                      <p>
                        <strong>Level:</strong>{" "}
                        {mood.moodLevel}/5
                      </p>

                      <p>
                        <strong>Activity:</strong>{" "}
                        {mood.activity || "None"}
                      </p>

                      <button
                        onClick={() =>
                          handleDownloadPDF(mood)
                        }
                        className="btn w-100 mt-3"
                        style={{
                          background: "#39ff88",
                          color: "#050705",
                          fontWeight: "bold",
                        }}
                      >
                        📥 Download PDF
                      </button>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}

          {/* Existing Downloads */}
          {downloads.length > 0 && (
            <div className="mt-5">

              <h4
                style={{
                  color: "#39ff88",
                  fontStyle: "italic",
                }}
              >
                Recent Downloads
              </h4>

              <div className="table-responsive mt-3">
                <table
                  className="table table-dark table-hover"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <thead>
                    <tr>
                      <th>File</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {downloads.map((download) => (
                      <tr key={download.id}>
                        <td>{download.fileName}</td>
                        <td>{download.downloadDate}</td>
                        <td>{download.downloadTime}</td>

                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(download.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center"
        style={{
          background: "#050705",
          borderTop: "1px solid #285538",
          padding: "18px 10px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#39ff88",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: "16px",
          }}
        >
          💭 Daily Mood Tracker
        </div>

        <small
          style={{
            color: "#8a958e",
            display: "block",
            marginTop: "5px",
          }}
        >
          Track your mood • Understand yourself • Build self-awareness
        </small>

        <div
          style={{
            color: "#56635b",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          © 2026 Daily Mood Tracker. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

export default Download;