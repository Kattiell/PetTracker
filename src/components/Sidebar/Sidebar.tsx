import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { FaUser, FaClipboardList, FaSearch, FaHome } from "react-icons/fa";
import { useSidebar } from "../../context/SideBarContext";

interface SidebarProps {
  expanded: boolean;
}

const SidebarContainer = styled.div<SidebarProps>`
  width: ${(props) => (props.expanded ? "250px" : "0")};
  height: calc(100vh - 60px); /* Ajuste para ficar abaixo do Header */
  background: linear-gradient(135deg, #fae1b4, #ff914d);
  color: black;
  transition: width 0.3s;
  overflow: hidden;
  position: fixed;
  top: 70px; /* Distância do topo para alinhar abaixo do Header */
  left: 0;
  box-shadow: ${(props) => (props.expanded ? "4px 0px 10px rgba(0, 0, 0, 0.2)" : "none")};
  z-index: 1000; /* Garante que o sidebar fique acima do conteúdo */
`;
;

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

export default function Sidebar() {
  const { isExpanded } = useSidebar();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <SidebarContainer expanded={isExpanded}>
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
    </SidebarContainer>
  );
}
