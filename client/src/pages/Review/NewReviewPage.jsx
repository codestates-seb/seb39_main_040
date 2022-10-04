import styled from "styled-components";
import NewReviewForm from "../../components/review/NewReviewForm";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import React from "react";

const NewReviewPage = () => {
  return (
    <NewReviewWrapper>
      <Header />
      <MiddleTitle>리뷰쓰기</MiddleTitle>
      <FormContent>
        <NewReviewForm />
      </FormContent>
    </NewReviewWrapper>
  );
};

export default NewReviewPage;

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
