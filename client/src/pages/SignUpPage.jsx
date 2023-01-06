import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

// 사용된 이모티콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/common/Header";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API}/users/signup`, data)
      .then(() => {
        Swal.fire({
          title: "회원가입에 성공했습니다.",
          text: "로그인을 시도해주세요.",
          confirmButtonColor: "var(--green-010)",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.status);
        if (err.response.data.status === 409) {
          Swal.fire({
            title: "이미 사용중인 이메일입니다.",
            text: "다른 이메일을 입력해주세요",
            icon: "warning",
            confirmButtonColor: "var(--green-010)",
          });
        }
      });
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
                  required
                  {...register("userName", {
                    required: true,
                    pattern: /^[가-힣]+$/,
                  })}
                ></input>
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
                  required
                  {...register("email", {
                    required: true,
                    pattern:
                      // eslint-disable-next-line
                      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                ></input>
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
                  required
                  {...register("password", {
                    required: true,
                  })}
                ></input>
                {errors.password && errors.password.type === "required" && (
                  <p>비밀번호를 입력해주세요.</p>
                )}
              </label>
            </div>
            <div className="input">
              <label htmlFor="password_check">
                <FontAwesomeIcon icon={faLock} />
                <input
                  id="password_check"
                  type="password"
                  placeholder="PasswordCheck"
                  required
                  {...register("password_check", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                ></input>
                {errors.password_check &&
                  errors.password_check.type === "validate" && (
                    <p>비밀번호가 일치하지 않습니다.</p>
                  )}
              </label>
            </div>
            <div className="input">
              <label htmlFor="mobile">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="mobile"
                  type="mobile"
                  placeholder="PhoneNumber"
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

  .input {
    margin-bottom: 10px;
    color: var(--green-010);
  }

  input {
    font-size: 20px;
    padding: 5px 90px 10px 0px;

    -webkit-appearance: none;

    display: block;
    background: var(--white-010);
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--gray-030);
    color: var(--green-010);
  }

  input:focus {
    outline: none;
    border-bottom: 1px solid var(--gray-020);
  }

  input::placeholder {
    color: var(--gray-020);
    font-size: 15px;
    opacity: 0.5;
  }

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
