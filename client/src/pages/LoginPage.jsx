import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/Header";

import useLoginStore from "../store/useLoginStore";
import Swal from "sweetalert2";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const { setIsLogin } = useLoginStore();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, data)
      .then((res) => {
        localStorage.setItem("access_token", res.headers.accesstoken);
        localStorage.setItem("refresh_token", res.headers.refreshtoken);
        setIsLogin();
        Swal.fire({
          title: "로그인 되었습니다.",
          text: "좋은 하루 보내세요 ☀️",
          confirmButtonColor: "var(--green-010)",
          imageUrl:
            "https://cdn.pixabay.com/photo/2016/03/24/13/45/coffee-1276778_960_720.jpg",
          imageWidth: 500,
          imageHeight: 300,
          imageAlt: "로그인이미지",
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          title: "로그인에 실패했습니다.",
          text: "아이디 혹은 비밀번호를 확인해주세요.",
          confirmButtonColor: "var(--green-010)",
          icon: "error",
        });
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
                  })}
                ></input>
              </label>
            </div>
            <SignUpBox>
              <StyledLink to="/signup">
                <div>회원이 아니십니까?</div>
              </StyledLink>
            </SignUpBox>
            <LoginButton>로그인</LoginButton>
          </form>
        </InputBox>
      </LoginBox>
    </>
  );
};

export default LoginPage;

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

  .input {
    margin-bottom: 20px;
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
