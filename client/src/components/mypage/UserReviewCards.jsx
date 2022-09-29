import React from "react";
import styled from "styled-components";
import UserReviewCard from "./UserReviewCard";

const ReviewCardWrapper = styled.div``;

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
