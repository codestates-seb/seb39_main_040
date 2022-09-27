import styled from "styled-components";
import MyPageTab from "../../components/ui/myPageTab/MyPageTab";
import Title from "../../components/common/Title";

const MyPageWrapper = styled.div`
  display: flex;
  align-items: center;
  //justify-content: center;
  flex-direction: column;
  margin-top: 70px;
  //background-color: #ae9e8f;
  width: 100%;
  height: 100vh;
`;

const UserInfoPage = () => {
  return (
    <MyPageWrapper>
      <Title>MY PAGE</Title>
      <MyPageTab />
    </MyPageWrapper>
  );
};

export default UserInfoPage;
