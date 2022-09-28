import styled from "styled-components";
import UserReviewCard from "./UserReviewCard";
import React from "react";

const ReviewCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 65%;
  margin: 0 auto;
  align-items: center;
`;

const UserReviewCards = () => {
  return (
    <ReviewCardWrapper>
      <UserReviewCard />
      <UserReviewCard />
      <UserReviewCard />
      <UserReviewCard />
    </ReviewCardWrapper>
  );
};

export default UserReviewCards;
