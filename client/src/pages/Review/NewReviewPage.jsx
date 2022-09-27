import styled from "styled-components";
import ReviewForm from "../../components/review/ReviewForm";
import Header from "../../components/common/Header";

const NewReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  width: 1520px;
  height: 1400px;
  border: 1px solid black;
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
      <FormContent>
        <ReviewForm />
      </FormContent>
    </NewReviewWrapper>
  );
};

export default NewReviewPage;
