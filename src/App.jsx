import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MoodHistory from "./pages/MoodHistory";
import LandingPage from "./pages/LandingPage";
import Download from "./pages/Download";
import AllDownloads from "./pages/AllDownloads";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mood-history"
        element={ <ProtectedRoute>
          <MoodHistory />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<LandingPage />} />
       <Route
  path="/downloads"
  element={
    <ProtectedRoute>
      <Download />
    </ProtectedRoute>
  }
  
/>
<Route
  path="/all-downloads"
  element={
    <ProtectedRoute>
      <AllDownloads />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default App;


