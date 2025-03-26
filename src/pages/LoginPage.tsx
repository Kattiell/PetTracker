import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import "./../../src/index.css";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #A7E9AF, #F4F9F4);
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
`;

const Input = styled.input<{ borderColor: string }>`
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
  border: 2px solid ${(props) => props.borderColor};
  border-radius: 8px;
  width: 100%;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #5DADE2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3498DB;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #E74C3C;
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessText = styled.p`
  color: #2ECC71;
  font-size: 12px;
  margin-top: 4px;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: auto;
  img {
    width: 100%;
    border-radius: 12px;
  }
`;



const schema = z.object({
  username: z.string().email('Por favor, insira um email válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const usernameValue = watch('username');
  const passwordValue = watch('password');

  const getEmailBorderColor = (value?: string) => {
    if (!usernameTouched || value === undefined || value === '') return '#000000';
    return errors.username ? '#E74C3C' : '#2ECC71';
  };

  const getPasswordBorderColor = (value?: string) => {
    if (!passwordTouched || value === undefined || value === '') return '#000000';
    return errors.password ? '#E74C3C' : '#2ECC71';
  };

  const onSubmit = async (data: FormData) => {
    await login();
    navigate('/admin');
  };

  return (
    <LoginContainer>

      <ContentWrapper>
        <ImageWrapper>
          <img src="/trackerpet.png" alt="Pets Felizes" />
        </ImageWrapper>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              placeholder="Usuário (Email)"
              {...field}
              borderColor={getEmailBorderColor(field.value)}
              onFocus={() => setUsernameTouched(true)}
              aria-label="Email"
            />
          )}
        />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
        {!errors.username && usernameValue?.includes('@') && <SuccessText>Email válido</SuccessText>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Senha"
              {...field}
              borderColor={getPasswordBorderColor(field.value)}
              onFocus={() => setPasswordTouched(true)}
              aria-label="Senha"
            />
          )}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </LoginForm>
      </ContentWrapper>
    </LoginContainer>
  );
}
