import styled from "styled-components";
import EditReviewForm from "../../components/review/EditReviewForm";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";

const EditReviewWrapper = styled.div`
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

const EditReviewPage = () => {
  return (
    <EditReviewWrapper>
      <Header />
      <MiddleTitle>리뷰 수정하기</MiddleTitle>
      <FormContent>
        <EditReviewForm />
      </FormContent>
    </EditReviewWrapper>
  );
};

export default EditReviewPage;
