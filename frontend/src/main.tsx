import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/Home.tsx";
import CreateURL from "@/pages/CreateURL.tsx";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import Analytics from "./pages/Analytics";
import { Navigate } from "react-router";
import AnalyticsByID from "./pages/analytics/AnalyticsByID";
import AnalyticsByTopic from "./pages/analytics/AnalyticsByTopic";
import AnalyticsAll from "./pages/analytics/AnalyticsAll";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/analytics" element={<Analytics />}>
            <Route path="" element={<Navigate to="analyticsall" replace />} />{" "}
            {/* Redirect /dash to /dash/main */}
            <Route path="/analytics/analyticsall" element={<AnalyticsAll />} />
            <Route
              path="/analytics/analyticsbytopic"
              element={<AnalyticsByTopic />}
            />
            <Route
              path="/analytics/analyticsbyid"
              element={<AnalyticsByID />}
            />
          </Route>

          <Route path="/create" element={<CreateURL />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
