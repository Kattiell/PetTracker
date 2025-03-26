import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "../../context/SideBarContext";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right, #f5a25d, #ff7f50);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 9;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default function Header() {
  const location = useLocation();
  const { toggleSidebar } = useSidebar(); // Obtém a função para abrir/fechar o menu

  if (location.pathname === "/") {
    return null;
  }

  return (
    <HeaderContainer>
      <ToggleButton onClick={toggleSidebar}>
        <FaBars />
      </ToggleButton>
      <Title>Pet Tracker</Title>
    </HeaderContainer>
  );
}
