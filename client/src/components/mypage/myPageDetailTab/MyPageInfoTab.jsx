import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  align-items: center;
  border: 1px solid red;
  width: 930px;
  height: 300px;
`;

const ProfileImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 50px;
  margin-left: 20px;
  //border: 1px solid green;
`;

const ProfileInfo = styled.div`
  max-width: 580px;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 170px;
  }
  li {
    margin-bottom: 20px;
  }
`;

const ButtonBox = styled.div`
  //border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  button {
    width: 100px;
    height: 50px;
    margin: 10px;
    background-color: #f0ece3;
    border-radius: 10px;
    color: #735757;
    font-weight: bold;
    font-size: 15px;
  }
  button:hover {
    background-color: #dacaa5;
  }
`;
const MyPageInfoTab = () => {
  return (
    <MainWrapper>
      <InfoWrapper>
        <ProfileImg src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjlfMzkg/MDAxNTg1NDA4ODEzMzI2.TgYHw1rfLOzhNud2l1TQnYpBWO2C5s9gaILeSU07HLIg.jni1H76nFFFoYqBEzRZDccNAV8uLzzcxhtsvxqN7QCIg.PNG.tarkyami/%ED%95%9C%EC%86%8C%ED%9D%AC28.png?type=w800" />
        <ProfileInfo>
          <ul>
            <li>이름 : 한소희</li>
            <li>이메일 : hanxoxo@gmail.com</li>
            <li>전화번호 : 010-XXXX-XXXX</li>
          </ul>
        </ProfileInfo>
      </InfoWrapper>
      <ButtonBox>
        <button className="button-edit">정보수정</button>
        <button className="button-delete">회원탈퇴</button>
      </ButtonBox>
    </MainWrapper>
  );
};

export default MyPageInfoTab;
