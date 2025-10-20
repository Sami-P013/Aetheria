import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/oracle"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold mb-4">Cosmic Oracle</h1>
                    <p className="text-white/60">Coming soon...</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/meditation"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold mb-4">Meditation Studio</h1>
                    <p className="text-white/60">Coming soon...</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/galactic"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold mb-4">Galactic Heritage</h1>
                    <p className="text-white/60">Coming soon...</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/geometry"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold mb-4">Sacred Geometry</h1>
                    <p className="text-white/60">Coming soon...</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dna"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold mb-4">DNA Activation</h1>
                    <p className="text-white/60">Coming soon...</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
