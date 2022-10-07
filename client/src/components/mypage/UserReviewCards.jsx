import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserReviewCard from "./UserReviewCard";

const UserReviewCards = () => {
  const [reviewInfos, setReviewInfos] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .get(`${process.env.REACT_APP_API}/users/reviews`)
      .then((res) => {
        console.log(res.data.reviews);
        setReviewInfos(res.data.reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ReviewCardWrapper>
      {reviewInfos.length === 0 ? (
        <MessageBox>
          <div>작성한 리뷰가 없습니다!</div>
        </MessageBox>
      ) : (
        reviewInfos.map((el) => (
          <UserReviewCard
            key={el.id}
            review_id={el.id}
            cafe_id={el.cafe.id}
            cafe_name={el.cafe.name}
            content={el.description}
            star={el.score}
            review_img={el.reviewImg}
            tags={el.tags}
          />
        ))
      )}
    </ReviewCardWrapper>
  );
};

export default UserReviewCards;

const ReviewCardWrapper = styled.div``;

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
