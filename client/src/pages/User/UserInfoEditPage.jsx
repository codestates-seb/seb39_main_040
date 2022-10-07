import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import instance from "../../api/core";

import Header from "../../components/common/Header";
import Swal from "sweetalert2";

const UserInfoEditPage = () => {
  const [imgSrc, setImgSrc] = useState();
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [img, setImg] = useState("");
  const [imgInfo, setImgInfo] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [userPreProfile, setUserPreProfile] = useState("");

  const navigate = useNavigate();

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
    if (userName && mobile && img) {
      instance
        .patch(`${process.env.REACT_APP_API}/users/information`, newInfo)
        .then(() => {
          e.preventDefault();
          setUserInfo(userInfo);
          Swal.fire({
            title: "정보가 수정되었습니다.",
            confirmButtonColor: "var(--green-010)",
          });
          navigate("/userinfo");
        })
        .catch((err) => console.log(err));
    } else if (!img) {
      Swal.fire({
        title: "사진이 등록되지 않았습니다.",
        icon: "error",
        confirmButtonColor: "var(--green-010)",
      });
    } else if (!userName) {
      Swal.fire({
        title: "이름이 작성되지 않았습니다.",
        icon: "error",
        confirmButtonColor: "var(--green-010)",
      });
    } else if (!mobile) {
      Swal.fire({
        title: "전화번호가 작성되지 않았습니다.",
        icon: "error",
        confirmButtonColor: "var(--green-010)",
      });
    }
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("images", imgInfo);
    let token = localStorage.getItem("access_token");
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .post(`${process.env.REACT_APP_API}/images/upload`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImg(res.data.id);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [imgInfo]);

  useEffect(() => {
    let token = localStorage.getItem("access_token") || "";
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios.get(`${process.env.REACT_APP_API}/users/information`).then((res) => {
      setUserInfo(res.data);
      setUserPreProfile(res.data.profilePhoto.path);
      setUserName(userInfo.userName);
    });
  }, []);

  return (
    <>
      <Header />
      <EditWrapper>
        <UserImgUpdate>
          {!img ? (
            <Img src={userPreProfile} alt="이전이미지" />
          ) : (
            <Img src={imgSrc} alt="이미지확인" />
          )}
          <ImgUpdateButton>
            사진 수정
            <input
              className="profile"
              type="file"
              accept="image/*"
              onChange={uploadImg}
            />
          </ImgUpdateButton>
        </UserImgUpdate>
        <InfoWrapper onSubmit={onChangeInfo}>
          <InfoDataBox>
            <InputData>이름</InputData>
            <input
              type="text"
              value={userName}
              placeholder={userInfo.userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </InfoDataBox>
          <InfoDataBox>
            <InputData>전화번호</InputData>
            <input
              value={mobile}
              placeholder={userInfo.mobile}
              onChange={(e) => setMobile(e.target.value)}
            ></input>
          </InfoDataBox>
          <Button>수정하기</Button>
          <Button onClick={() => navigate("/userinfo")}>뒤로가기</Button>
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
`;

const Img = styled.img`
  width: 250px;
  height: 250px;

  // 정의된 너비와 높이를 가득 채울때까지 확대
  object-fit: cover;
  border-radius: 50%;
`;

const ImgUpdateButton = styled.label`
  border: none;
  background: none;
  cursor: pointer;
  margin: 15px;

  > input {
    margin-top: 10px;
    font-weight: 600;
    font-size: 1.2rem;
    text-align: center;
    display: none;
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

const Button = styled.button`
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
