import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import UserWishCard from "./UserWishCard";

const UserWishCards = () => {
  const [wishInfos, setWishInfos] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("access_token") || "";
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .get(`${process.env.REACT_APP_API}/users/wishlist`)
      .then((res) => {
        setWishInfos(res.data.wishlist);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <WishCardsWrapper>
      {wishInfos.length === 0 ? (
        <MessageBox>
          <div>찜한 카페가 없습니다!</div>
          <a href="/">카페구경하러 가기</a>
        </MessageBox>
      ) : (
        wishInfos.map((el) => (
          <UserWishCard
            key={el.id}
            id={el.id}
            name={el.name}
            tags={el.tags}
            img={el.main_img}
          />
        ))
      )}
    </WishCardsWrapper>
  );
};

export default UserWishCards;

const WishCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 72%;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
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
  }
  a {
    text-decoration: none;
    color: var(--gray-020);
  }
  a:hover {
    color: var(--green-010);
  }
`;
