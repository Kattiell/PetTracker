import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "../../context/SidebarContext";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right, #ff9a5a, #ff6b81); 
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.08);
  z-index: 9;
`;

const ToggleButton = styled.button` 
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #ffeaa7;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Inter', sans-serif; 
`;



export default function Header() {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  if (location.pathname === "/login") {
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
