import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashBoard";
import UserList from "./pages/UserList";
import PetProfile from "./pages/PetProfile";
import PetTracker from "./pages/PetTracker";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./pages/Register";
import { SidebarProvider } from "./context/SidebarContext";
import { ProtectedRoute } from "./context/AuthMiddleware";

export default function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Main />
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

function Main() {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (isAuthenticated && role && location.pathname === "/login") {
      navigate(role === "admin" ? "/admin" : "/home");
    }
  }, [isAuthenticated, role, navigate]);
  
  
  
  return (
    <>
      <Header />
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        {isAuthenticated && role !== "admin" && (
          <>
            <Route path="/pet/:id" element={<PetProfile />} />
            <Route path="/track/:id" element={<PetTracker />} />
          </>
        )}
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}