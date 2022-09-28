import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

// 사용된 이모티콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/Header";
import axios from "axios";

const SignUpBox = styled.div`
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
    margin-bottom: 20px;
    color: var(--green-010);
    font-size: 1.7rem;
    font-weight: 700;
  }

  // 이름, 이메일, 비밀번호, 전화번호 각각의 input 칸
  .input {
    margin-bottom: 10px;
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
    margin-top: 5px;
    font-size: 0.9rem;
  }
`;

const SignUpButton = styled.button`
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

const SignUpPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  // 유저데이터 확인용
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API}/users/signup`, data)
      .then((res) => {
        console.log(data);
        navigate("/login");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Header />
      <SignUpBox>
        <InputBox>
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input">
              <label htmlFor="userName">
                <FontAwesomeIcon icon={faUser} />
                <input
                  id="userName"
                  type="text"
                  placeholder="Name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  required
                  {...register("userName", {
                    required: true,
                    pattern: /^[가-힣]+$/,
                  })}
                ></input>
                {/* 유효성 검사를 실패할 경우 화면에 출력되는 값 */}
                {errors.userName && errors.userName.type === "required" && (
                  <p>이름을 입력해주세요</p>
                )}
                {errors.userName && errors.userName.type === "pattern" && (
                  <p>올바른 이름이 아닙니다.</p>
                )}
              </label>
            </div>
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
                    // pattern:
                    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                    // validate: (value) =>
                    //   value.length >= 8 && value.length <= 20,
                  })}
                ></input>
                {errors.password && errors.password.type === "required" && (
                  <p>비밀번호를 입력해주세요.</p>
                )}
                {/* {errors.password && errors.password.type === "pattern" && (
                  <p>비밀번호는 문자, 숫자, 특수문자의 조합이어야합니다.</p>
                )}
                {errors.password && errors.password.type === "validate" && (
                  <p>비밀번호는 최소 8글자 이상 20글자 이하입니다.</p>
                )} */}
              </label>
            </div>
            {/* <div className="input">
              <label htmlFor="passwordcheck">
                <FontAwesomeIcon icon={faCheck} />
                <input
                  id="passwordcheck"
                  type="password"
                  placeholder="PasswordCheck"
                  // value={checkPassword}
                  // onChange={(e) => setCheckPassword(e.target.value)}
                  required
                  {...register("passwordcheck", {
                    validate: (value) => value === watch("password"),
                  })}
                ></input>
                {errors.passwordcheck &&
                  errors.passwordcheck.type === "validate" && (
                    <p>비밀번호가 일치하지 않습니다.</p>
                  )}
              </label>
            </div> */}
            <div className="input">
              <label htmlFor="mobile">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="mobile"
                  type="mobile"
                  placeholder="PhoneNumber"
                  // value={phone}
                  // onChange={(e) => setPhone(e.target.value)}
                  required
                  {...register("mobile", {
                    required: true,
                    pattern: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                  })}
                ></input>
                {errors.mobile && errors.mobile.type === "required" && (
                  <p>- 를 포함해 전화번호를 입력해주세요.</p>
                )}
                {errors.mobile && errors.mobile.type === "pattern" && (
                  <p>올바른 전화번호가 아닙니다.</p>
                )}
              </label>
            </div>
            <SignUpButton>가입하기</SignUpButton>
          </form>
        </InputBox>
      </SignUpBox>
    </>
  );
};

export default SignUpPage;
