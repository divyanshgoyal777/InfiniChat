import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import Loader from "./components/loader/Loader";
import Login from "./components/auth/Login/Login";
import Signup from "./components/auth/Signup/Signup";
import Home from "./components/home/Home";
import AiConversation from "./components/menu/AiConversation/AiConversation";
import CuriosityHub from "./components/menu/CuriosityHub/CuriosityHub";
import VisualCreation from "./components/menu/VisualCreation/VisualCreation";
import ProtectedRoute from "./components/ProtectedRoute";
import TextToImage from "./components/menu/TextToImage/TextToImage";
import GifSearch from "./components/menu/GifSearch/GifSearch";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Toaster />
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/ai-conversation"
              element={
                <ProtectedRoute>
                  <AiConversation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visual-creation"
              element={
                <ProtectedRoute>
                  <VisualCreation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curiosity-hub"
              element={
                <ProtectedRoute>
                  <CuriosityHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/texttoimage"
              element={
                <ProtectedRoute>
                  <TextToImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gifsearch"
              element={
                <ProtectedRoute>
                  <GifSearch />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </AuthProvider>
    </Router>
  );
};

export default App;
