import styled from "styled-components";
import { useForm } from "react-hook-form";

const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: none;
`;

const EmailArea = styled.div`
  margin-top: 70px;
  background-color: #f0ece3; //height: 50px;
  display: flex;
  flex-direction: column;
  color: #ae9e8f;
  font-size: 15px;
  padding: 5px;

  input {
    display: flex;
    flex-wrap: wrap;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid #ae9e8f;
    font-size: 15px;
    height: 30px;
    background-color: #f0ece3;
    width: 300px;
    margin-bottom: 10px;
  }
`;

const PasswordArea = styled.div`
  margin-top: 30px;
  background-color: #f0ece3; //height: 50px;
  color: #ae9e8f;
  font-size: 15px;
  padding: 5px;

  input {
    display: flex;
    flex-wrap: wrap;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid #ae9e8f;
    font-size: 15px;
    height: 30px;
    background-color: #f0ece3;
    width: 300px;
    margin-bottom: 10px;
  }
  // 자동완성시 input의 배경색이 자동으로 변환됨
  input:autofill {
    background-color: #f0ece3;
  }
`;

const LoginButton = styled.button`
  // 중앙 정렬
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  background-color: #ae9e8f;
  font-size: 17px;
  margin-top: 25px;
  width: 100px;
  text-align: center;
  height: 35px;
  border-radius: 5px;
  color: #f0ece3;

  &:hover {
    //color: #ae9e8f;
    opacity: 0.8;
  }
`;

function LoginForm({
  onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    //alert(JSON.stringify(data));
    // 로그인시 작성되는 이메일, 비밀번호값이 data로 입력되어 나타난다.
    console.log(data);
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  return (
    <LoginFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <EmailArea>
            <input
              id="email"
              type="text"
              placeholder="이메일을 입력하세요"
              aria-invalid={
                !isDirty ? undefined : errors.email ? "true" : "false"
              }
              {...register("email", {
                required: "이메일이 입력되지 않았습니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "올바른 이메일의 형태가 아닙니다.",
                },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </EmailArea>
        </label>
        <label htmlFor="password">
          <PasswordArea>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              aria-invalid={
                !isDirty ? undefined : errors.password ? "true" : "false"
              }
              {...register("password", {
                required: "비밀번호를 입력하지 않았습니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
                },
              })}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </PasswordArea>
        </label>
        <LoginButton type="submit" disabled={isSubmitting}>
          Login
        </LoginButton>
      </form>
    </LoginFormWrapper>
  );
}

export default LoginForm;
