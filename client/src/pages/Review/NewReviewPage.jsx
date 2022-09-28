import styled from "styled-components";
import ReviewForm from "../../components/review/ReviewForm";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";

const NewReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewReviewPage = () => {
  return (
    <NewReviewWrapper>
      <Header />
      <MiddleTitle>리뷰쓰기</MiddleTitle>
      <FormContent>
        <ReviewForm />
      </FormContent>
    </NewReviewWrapper>
  );
};

export default NewReviewPage;
