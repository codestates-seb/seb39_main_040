import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/Header";
import axios from "axios";
import useAuthStore from "../store/useAuth";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  min-height: 620px;
  margin: 0 auto;
  margin-top: 130px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  padding: 48px 32px 32px 32px;
  background: var(--white-010);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);

  h1 {
    margin-bottom: 50px;
    color: var(--green-010);
    font-size: 1.7rem;
    font-weight: 700;
  }

  // 이름, 이메일, 비밀번호, 전화번호 각각의 input 칸
  .input {
    margin-bottom: 20px;
    color: var(--green-010);
  }

  input {
    font-size: 20px;
    padding: 5px 90px 10px 0px;

    // 요소 자체 구성 요소 숨기는 css, safari&chrome에 해당
    -webkit-appearance: none;

    display: block;
    background: var(--white-010);
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--gray-030);
    color: var(--green-010);
  }

  // input 박스 클릭 시 강조되는 표현 제거
  input:focus {
    outline: none;
    border-bottom: 1px solid var(--gray-020);
  }

  input::placeholder {
    color: var(--gray-020);
    font-size: 15px;
    opacity: 0.5;
  }

  // 유효성 검사 후 적절하지 않을 시 나오는 안내 문구
  & label > p {
    color: var(--red-010);
    margin-top: 10px;
    font-size: 0.9rem;
  }
`;

const SignUpBox = styled.div`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 50px;
  margin-bottom: 20px;

  & > div,
  span {
    color: var(--gray-020);
    margin-bottom: 30px;
  }
`;

const StyledLink = styled(Link)`
  // Link로 연결된 스타일링 제거
  & > div {
    color: var(--gray-020);
    margin-bottom: 30px;
  }
`;

const LoginButton = styled.button`
  background: var(--green-010);
  text-align: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: var(--white-010);
  padding: 12px 24px;
  margin: 2px 0 20px 0;
  letter-spacing: 1px;
  border: 0;
  border-radius: 5px;

  &:hover {
    background: var(--white-010);
    color: var(--green-010);
    border: 1px solid var(--green-010);
  }
`;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useAuthStore();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, data)
      .then((res) => {
        console.log("로그인성공");
        console.log(res.headers);
        sessionStorage.setItem("access_token", res.headers.accesstoken);
        localStorage.setItem("refresh_token", res.headers.refreshtoken);
        setIsLogin(!isLogin);
        navigate("/userinfo");
      })
      .catch((error) => {
        console.log("회원 정보가 일치하지 않습니다.");
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <LoginBox>
        <InputBox>
          <h1>로그인</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  required
                  {...register("email", {
                    required: true,
                    pattern:
                      // eslint-disable-next-line
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
                  //required
                  {...register("password", {
                    required: true,
                    // pattern:
                    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                    // validate: (value) =>
                    //   value.length >= 8 && value.length <= 20,
                  })}
                ></input>
                {/* {errors.password && errors.password.type === "required" && (
                  <p>비밀번호를 입력해주세요.</p>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <p>비밀번호는 문자, 숫자, 특수문자의 조합이어야합니다.</p>
                )}
                {errors.password && errors.password.type === "validate" && (
                  <p>비밀번호는 최소 8글자 이상 20글자 이하입니다.</p>
                )} */}
              </label>
            </div>
            <SignUpBox>
              {/*아래 div, span 태그에는 Link를 연결해 해당 페이지로 이동하게 연결해야함 */}
              <StyledLink to="/signup">
                <div>회원이 아니십니까?</div>
              </StyledLink>
              <span>아이디찾기</span>
              <span> | </span>
              <span>비밀번호찾기</span>
            </SignUpBox>
            <LoginButton>로그인</LoginButton>
          </form>
        </InputBox>
      </LoginBox>
    </>
  );
};

export default LoginPage;
