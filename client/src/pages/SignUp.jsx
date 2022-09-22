import styled from "styled-components";
import SignUpForm from "../components/login/SignUpForm";

const SignUpWrapper = styled.div`
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
const SignUp = () => {
  return (
    <SignUpWrapper>
      <h1>Sign Up</h1>
      <SignUpForm />
    </SignUpWrapper>
  );
};

export default SignUp;
