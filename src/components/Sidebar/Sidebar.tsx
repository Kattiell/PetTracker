import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaClipboardList, FaSearch, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

const SidebarContainer = styled.div<{ expanded: boolean }>`
  width: ${(props) => (props.expanded ? "250px" : "0")};
  height: calc(100vh - 60px);
  background: linear-gradient(135deg, #fae1b4, #ff914d);
  color: black;
  transition: width 0.3s;
  overflow: hidden;
  position: fixed;
  top: 70px;
  left: 0;
  box-shadow: ${(props) => (props.expanded ? "4px 0px 10px rgba(0, 0, 0, 0.2)" : "none")};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 10px;
  width: 100%;
`;

const MenuItem = styled.li`
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 10px;
  margin: 5px 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  svg {
    font-size: 20px;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: none;
  color: black;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export default function Sidebar() {
  const { isExpanded, setSidebarState } = useSidebar();
  const { setIsAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    sessionStorage.clear(); 
    setIsAuthenticated(false); 

    setTimeout(() => {
      navigate("/login");
    }, 200); 
  };

  return (
    <SidebarContainer expanded={isExpanded} onMouseLeave={() => setSidebarState(false)}>
      <MenuList>
        <MenuItem>
          <Link to="/admin">
            <FaHome /> <span>Dashboard</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/users">
            <FaUser /> <span>Usuários</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register">
            <FaClipboardList /> <span>Cadastro</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/track/1">
            <FaSearch /> <span>Rastreamento</span>
          </Link>
        </MenuItem>
      </MenuList>

      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </LogoutButton>
    </SidebarContainer>
  );
}
