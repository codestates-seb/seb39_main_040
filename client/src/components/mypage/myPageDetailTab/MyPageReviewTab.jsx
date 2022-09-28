import styled from "styled-components";
import ReviewItem from "../ReviewItem";

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MyPageReviewTab = () => {
  return (
    <ReviewWrapper>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </ReviewWrapper>
  );
};

export default MyPageReviewTab;
