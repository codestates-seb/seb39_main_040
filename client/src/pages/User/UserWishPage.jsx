import styled from "styled-components";
import CafeCard from "../../components/cafe/CafeCard";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";

const WishWrapper = styled.div`
  border: 1px solid var(--gray-030);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 80%;
  height: 90vh;
  position: relative;
  margin: 0 auto;
`;

const UserWishPage = () => {
  return (
    <>
      <Header />
      <MiddleTitle>찜한카페</MiddleTitle>
      <WishWrapper>
        <CafeCard />
      </WishWrapper>
    </>
  );
};

export default UserWishPage;
