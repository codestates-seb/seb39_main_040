import styled from "styled-components";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 180px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  padding: 48px 32px 32px 32px;
  background: #f7f5f2;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);

  h1 {
    margin-bottom: 50px;
    color: #ae9e8f;
    font-size: 1.7rem;
    font-weight: 700;
  }

  // 이름, 이메일, 비밀번호, 전화번호 각각의 input 칸
  .input {
    margin-bottom: 20px;
    color: #ae9e8f;
  }

  input {
    font-size: 20px;
    padding: 5px 90px 10px 0px;

    // 요소 자체 구성 요소 숨기는 css, safari&chrome에 해당
    -webkit-appearance: none;

    display: block;
    background: #f7f5f2;
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
    color: #ae9e8f;
  }

  // input 박스 클릭 시 강조되는 표현 제거
  input:focus {
    outline: none;
  }

  input::placeholder {
    color: #636363;
    font-size: 15px;
    opacity: 0.5;
  }

  // 유효성 검사 후 적절하지 않을 시 나오는 안내 문구
  & label > p {
    color: #e64848;
    margin-top: 10px;
    font-size: 0.9rem;
  }
`;

const SignUpBox = styled.div`
  text-align: center;
  font-size: 0.9rem;
  //border: 1px solid red;
  margin-top: 50px;
  margin-bottom: 20px;

  & > div,
  span {
    color: #ae9e8f;
    margin-bottom: 30px;
  }
`;

const LoginButton = styled.button`
  padding: 12px 24px;
  margin: 2px 0 20px 0;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  //-webkit-font-smoothing: antialiased;
  text-align: center;
  letter-spacing: 1px;
  border: 0;
  background: #ae9e8f;
  border-radius: 5px;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  return (
    <LoginBox>
      <InputBox>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                id="email"
                type="text"
                placeholder="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              ></input>
              {/* 유효성 검사를 실패할 경우 화면에 출력되는 값 */}
              {errors.email && errors.email.type === "required" && (
                <p>이메일을 입력해주세요.</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p>올바른 이메일이 아닙니다.</p>
              )}
            </label>
          </div>
          <div className="input">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
              <input
                id="password"
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                  validate: (value) => value.length >= 8 && value.length <= 20,
                })}
              ></input>
              {errors.password && errors.password.type === "required" && (
                <p>비밀번호를 입력해주세요.</p>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <p>비밀번호는 문자, 숫자, 특수문자의 조합이어야합니다.</p>
              )}
              {errors.password && errors.password.type === "validate" && (
                <p>비밀번호는 최소 8글자 이상 20글자 이하입니다.</p>
              )}
            </label>
          </div>
          <SignUpBox>
            {/*아래 div, span 태그에는 Link를 연결해 해당 페이지로 이동하게 연결해야함 */}
            <div>회원이 아니십니까?</div>
            <span>아이디찾기</span>
            <span> | </span>
            <span>비밀번호찾기</span>
          </SignUpBox>
          <LoginButton>로그인</LoginButton>
        </form>
      </InputBox>
    </LoginBox>
  );
};

export default Login;
