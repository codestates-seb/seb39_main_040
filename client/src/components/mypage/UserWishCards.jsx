import styled from "styled-components";
import UserWishCard from "./UserWishCard";
import React from "react";

const WishCardsWrapper = styled.div`
  //border: 1px solid red;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 72%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-around;
`;

const UserWishCards = () => {
  return (
    <WishCardsWrapper>
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
      <UserWishCard />
    </WishCardsWrapper>
  );
};

export default UserWishCards;
