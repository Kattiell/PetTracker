import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';


const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #fae1b4, #ff914d);
  padding: 20px;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; // Ocupa o espaço restante ao lado da Sidebar
`;

const FormWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  color: #ff914d;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #ff914d;
    box-shadow: 0 0 8px rgba(255, 145, 77, 0.3);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff914d;
    box-shadow: 0 0 8px rgba(255, 145, 77, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff914d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #e67e22;
    transform: scale(1.05);
  }
`;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Container>
       <Header />
      <Sidebar /> 
      <ContentWrapper>
        <FormWrapper>
          <Title>Registro</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Selecione o tipo</option>
              <option value="admin">Admin</option>
              <option value="pet">Pet</option>
            </Select>
            <Button type="submit">Registrar</Button>
          </form>
        </FormWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default Register;
