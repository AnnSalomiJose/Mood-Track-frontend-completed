import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getDownloadsAPI,
  deleteDownloadAPI,
} from "../../services/apiServices";

function AllDownloads() {
  const loggedUser = JSON.parse(
    sessionStorage.getItem("loggedUser")
  );

  const [downloads, setDownloads] = useState([]);

  const navigate = useNavigate();

  // Get downloads
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

  // Delete download
  const handleDelete = async (id) => {
    try {
      await deleteDownloadAPI(id);

      setDownloads((prevDownloads) =>
        prevDownloads.filter((item) => item.id !== id)
      );

      alert("Download deleted successfully!");
    } catch (error) {
      console.error("Error deleting download:", error);

      alert("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    if (loggedUser?.id) {
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

      {/* Main */}
      <main className="flex-grow-1">
        <div className="container py-4">

          {/* Heading */}
          <div className="text-center mb-4">
            <h3
              style={{
                color: "#39ff88",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              MY PDF REPORTS
            </h3>

            <p
              className="text-secondary mb-0"
              style={{ fontSize: "14px" }}
            >
              Your downloaded mood reports
            </p>
          </div>

          {/* No downloads */}
          {downloads.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "50px" }}>📂</div>

              <h6 className="text-secondary mt-3">
                No downloads yet
              </h6>
            </div>
          ) : (
            <div className="row g-4">

              {downloads.map((download) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={download.id}
                >

                  {/* Small Card */}
                  <div
                    style={{
                      background: "#111814",
                      border: "1px solid #263c2d",
                      borderRadius: "12px",
                      padding: "8px",
                      boxShadow:
                        "0 5px 15px rgba(0,0,0,0.3)",
                    }}
                  >

                    {/* PDF Preview */}
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "210 / 297",
                        background: "white",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >

                      {download.pdfData ? (
                        <iframe
                          src={`${download.pdfData}#toolbar=0&navpanes=0&scrollbar=0`}
                          title={download.fileName}
                          width="100%"
                          height="100%"
                          scrolling="no"
                          style={{
                            display: "block",
                            border: "none",
                            overflow: "hidden",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            color: "#555",
                            padding: "15px",
                          }}
                        >
                          <div style={{ fontSize: "35px" }}>
                            📄
                          </div>

                          <small>
                            Preview unavailable
                          </small>
                        </div>
                      )}

                    </div>

                    {/* File Name */}
                    <div className="pt-2">

                      <p
                        className="mb-1"
                        style={{
                          color: "#39ff88",
                          fontSize: "13px",
                          fontWeight: "bold",
                          wordBreak: "break-word",
                        }}
                      >
                        📄 {download.fileName}
                      </p>

                      <p
                        className="text-secondary mb-2"
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        {download.downloadDate} •{" "}
                        {download.downloadTime}
                      </p>

                      {/* Delete */}
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() =>
                          handleDelete(download.id)
                        }
                        style={{
                          fontSize: "12px",
                        }}
                      >
                         Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center mt-auto"
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

export default AllDownloads;