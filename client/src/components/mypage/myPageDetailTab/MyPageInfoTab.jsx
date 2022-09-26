import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const InfoBox = styled.div`
  display: flex;
  border: 1px solid red;
  min-width: 1080px; // 1080 - 360 = 720/2 = 360 + 180 + 180
  height: 400px;
`;

const InfoImgBox = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 304px;
    height: 304px;
    border-radius: 50%;
  }
  button {
    margin-top: 20px;
    width: 80px;
    height: 24px;
    border-radius: 5px;
    background-color: #f0ece3;
    color: #735757;
  }
  button:focus {
    outline: none;
  }
`;

const InfoDetailBox = styled.div`
  //border: 1px solid green;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 180px;
  height: 400px;
  div {
    padding: 20px 0 20px 60px;
  }
`;

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 270px;
  height: 400px;
  div {
    margin: 20px 0 20px 0;
    border-bottom: 1px solid #757575;
  }
`;

const ButtonBox = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: 72px;
  button {
    //margin-top: 20px;
    width: 88px;
    height: 36px;
    border-radius: 5px;
    background-color: #f0ece3;
    color: #735757;
    margin-left: 20px;
    margin-bottom: 24px;
  }
  button:focus {
    outline: none;
  }
`;

const MyPageInfoTab = () => {
  const [userInfo, setUserInfo] = useState(true);

  return (
    <InfoBox>
      <InfoImgBox>
        {userInfo ? (
          <img
            src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjlfMzkg/MDAxNTg1NDA4ODEzMzI2.TgYHw1rfLOzhNud2l1TQnYpBWO2C5s9gaILeSU07HLIg.jni1H76nFFFoYqBEzRZDccNAV8uLzzcxhtsvxqN7QCIg.PNG.tarkyami/%ED%95%9C%EC%86%8C%ED%9D%AC28.png?type=w800"
            alt="유저이미지"
          />
        ) : (
          <FontAwesomeIcon className="icon" icon={faImage} size="3x" />
        )}

        {/* <button>이미지 추가</button> */}
      </InfoImgBox>
      <InfoDetailBox>
        <InfoTitle>
          <div>이름</div>
          <div>이메일</div>
          <div>전화번호</div>
        </InfoTitle>
        <InfoDetail>
          <div>한소희</div>
          <div>hanxoxo@gmail.com</div>
          <div>010-XXXX-XXXX</div>
        </InfoDetail>
        <ButtonBox>
          <Link to="/userupdate">
            <button>수정하기</button>
          </Link>
          <button>회원탈퇴</button>
        </ButtonBox>
      </InfoDetailBox>
    </InfoBox>
  );
};

export default MyPageInfoTab;
