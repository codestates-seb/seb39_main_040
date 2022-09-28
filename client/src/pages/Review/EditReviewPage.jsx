import styled from "styled-components";
import ReviewForm from "../../components/review/ReviewForm";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import React from "react";

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
        <ReviewForm />
      </FormContent>
    </EditReviewWrapper>
  );
};

export default EditReviewPage;
