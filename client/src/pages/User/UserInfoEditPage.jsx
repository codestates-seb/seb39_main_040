import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/common/Header";
import useAuthStore from "../../store/useAuth";
import instance from "../../api/core";
import { HiPhotograph } from "react-icons/hi";

const UserInfoEditPage = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [img, setImg] = useState("");
  const [imgInfo, setImgInfo] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  // const { userInfo, setUserInfo } = useAuthStore();
  // console.log(userInfo);

  const navigate = useNavigate();

  const onUploadImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", imgInfo);

    axios
      .post(`${process.env.REACT_APP_API}/images/upload`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          AccessToken: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setImg(res.data.id);
        alert("사진추가 완료");
        console.log("사진추가완료");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const uploadImg = (e) => {
    e.preventDefault();
    setImgInfo(e.target.files[0]);
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  const onChangeInfo = (e) => {
    e.preventDefault();
    const newInfo = { userName: userName, mobile: mobile, profilePhoto: img };
    instance
      .patch(`${process.env.REACT_APP_API}/users/information`, newInfo)
      .then(() => {
        console.log("정보수정완료");
        e.preventDefault();
        // console.log(newInfo);
        setUserInfo(userInfo);
        // console.log(userInfo);
        navigate("/userinfo");
      })
      .catch((err) => console.log(err));
  };

  // imgInfo가 바뀔 때(마다) 이미지 post 요청 실행
  useEffect(() => {
    const formData = new FormData();
    formData.append("images", imgInfo);
    console.log(formData);
    let token = localStorage.getItem("access_token");
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .post(`${process.env.REACT_APP_API}/images/upload`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setImg(res.data.id);
        alert("사진추가 완료");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [imgInfo]);

  useEffect(() => {
    // setUserInfo();
    let token = localStorage.getItem("access_token") || "";
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .get(`${process.env.REACT_APP_API}/users/information`)
      .then((res) => setUserInfo(res.data));
  }, []);

  return (
    <>
      <Header />
      <EditWrapper>
        <UserImgUpdate>
          {!imgSrc ? (
            <HiPhotograph className="icon" />
          ) : (
            <Img src={imgSrc} alt="이미지확인" />
          )}
          <ImgUpdateButton>
            <input
              className="profile"
              type="file"
              accept="image/*"
              onChange={uploadImg}
              // ref={imgInput}
            />
            <button type="submit">이미지 등록하기</button>
          </ImgUpdateButton>
        </UserImgUpdate>
        <InfoWrapper onSubmit={onChangeInfo}>
          <InfoDataBox>
            <InputData>이름</InputData>
            <input
              placeholder={userInfo.userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </InfoDataBox>
          <InfoDataBox>
            <InputData>전화번호</InputData>
            <input
              placeholder="변경할 전화번호를 적어주세요"
              onChange={(e) => setMobile(e.target.value)}
            ></input>
          </InfoDataBox>
          <UpdateButton>수정 완료</UpdateButton>
        </InfoWrapper>
      </EditWrapper>
    </>
  );
};

export default UserInfoEditPage;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  position: relative;
  margin: 0 auto;
`;

const UserImgUpdate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    //background-color: var(--gray-020);
    width: 70%;
    height: 70%;
  }
`;

const Img = styled.img`
  width: 250px;
  height: 250px;

  // 정의된 너비와 높이를 가득 채울때까지 확대
  object-fit: cover;
  border-radius: 50%;
`;

const ImgUpdateButton = styled.div`
  border: none;
  background: none;
  cursor: pointer;

  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    > input {
      margin-top: 10px;
      font-weight: 600;
      font-size: 1.2rem;
    }
    > input .profile {
      display: none;
    }
  }

  > input {
    margin-top: 10px;
    font-weight: 600;
    font-size: 1.2rem;
  }
  form > input.profile {
    border: 1px solid red;
  }
`;

const InfoWrapper = styled.form`
  width: 400px;
  padding: 10px 30px;
`;

const InfoDataBox = styled.div`
  display: flex;
  margin-top: 10px;
  input {
    width: 70%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid var(--gray-030);
    outline: none;
    margin-left: 15px;

    &:focus {
      border: none;
      border-bottom: 1px solid var(--gray-030);
      box-shadow: 5px 5px 10px var(--gray-020);
      transition: 0.3s;
    }
  }
`;

const InputData = styled.div`
  margin: 10px 0;
  width: 80px;
  padding: 10px;
`;

const UpdateButton = styled.button`
  border: 1px solid var(--green-010);
  border-radius: 5px;
  background: var(--white-010);
  color: var(--green-010);
  width: 100%;
  margin-top: 20px;
  font-size: 1.2rem;
  padding: 10px 40px;
  cursor: pointer;
  &:hover {
    color: var(--white-010);
    background: var(--green-010);
  }
`;
