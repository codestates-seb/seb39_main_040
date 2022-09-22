import styled from "styled-components";
import LoginForm from "../components/login/LoginForm";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  width: 450px;
  height: 550px;
  margin: 0 auto;
  margin-top: 180px;
  // border: 1px solid red;
  background-color: #f0ece3;
  border-radius: 20px;
  h1 {
    background-color: #ae9e8f;
    font-size: 27px;
    margin-top: 40px;
    width: 300px;
    text-align: center;
    height: 50px;
    padding: 10px;
    border-radius: 10px;
    color: #f0ece3;
  }
`;
const LinkBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  font-size: 15px;

  a {
    text-decoration: none !important;
    list-style: none;
    color: #ae9e8f;
  }

  a:nth-child(1) {
    margin-bottom: 30px;
  }
`;

const Login = () => {
  return (
    <LoginWrapper>
      <h1>LOGIN</h1>
      <LoginForm />
      <LinkBlock>
        <a href="/">회원이 아니신가요?</a>
        <a href="/">아이디 찾기 | 비밀번호 찾기</a>
      </LinkBlock>
    </LoginWrapper>
  );
};

export default Login;
