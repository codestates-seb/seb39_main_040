import styled from "styled-components";
import UserWishCard from "./UserWishCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

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

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 40vh;

  div {
    margin-bottom: 50px;
    color: var(--gray-020);
    font-size: 3rem;
    //opacity: 0.6;
  }
  a {
    text-decoration: none;
    color: var(--gray-020);
  }
  a:hover {
    color: var(--green-010);
  }
`;

const UserWishCards = () => {
  const [wishInfos, setWishInfos] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/wishlist`, {
        headers: { AccessToken: sessionStorage.getItem("access_token") },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <WishCardsWrapper>
      {/* {wishInfos.length === 0 ? (
        <MessageBox>
          <div>찜한 카페가 없습니다!</div>
          <a href="/">카페구경하러 가기</a>
        </MessageBox>
      ) : (
        wishInfos.map((el) => (
          <UserWishCard
            key={el.id}
            id={el.id}
            title={el.name}
            description={el.description}
            img={el.mainImgUrl}
          />
        ))
      )} */}
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
