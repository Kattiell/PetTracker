import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
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
import "./index.css";
import { SidebarProvider } from "./context/SideBarContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

export default function APP() {
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
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <Header />
      <Content>
        {isAuthenticated && <Sidebar />}
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/pet/:id" element={<PetProfile />} />
              <Route path="/track/:id" element={<PetTracker />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
        </Routes>
      </Content>
      <Footer />
    </Container>
  );
}
