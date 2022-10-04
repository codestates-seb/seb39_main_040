import React from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import UserReviewCards from "../../components/mypage/UserReviewCards";

const UserReviewPage = () => {
  return (
    <>
      <Header />
      <MiddleTitle>나의리뷰</MiddleTitle>
      <ReviewWrapper>
        <UserReviewCards />
      </ReviewWrapper>
    </>
  );
};

export default UserReviewPage;

const ReviewWrapper = styled.div`
  grid-template-rows: repeat(auto-fill, minmax(240px, 1fr));
  margin: 0 auto;
  max-width: 940px;
  display: grid;
  gap: 20px;
`;
