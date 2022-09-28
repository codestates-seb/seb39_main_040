import styled from "styled-components";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import CafeReviewCards from "../../components/cafe/CafePageBottomSection/CafeReviews/CafeReviewCards";

const ReviewWrapper = styled.div`
  border: 1px solid var(--gray-030);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 60%;
  height: 90vh;
  position: relative;
  margin: 0 auto;
`;

const UserReviewPage = () => {
  return (
    <>
      <Header />
      <MiddleTitle>나의리뷰</MiddleTitle>
      <ReviewWrapper>
        <CafeReviewCards />
      </ReviewWrapper>
    </>
  );
};

export default UserReviewPage;
