import Tag from "../common/Tag";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import React from "react";

const ReviewCardWrapper = styled.div`
  display: flex;
  border-radius: 8px;
  width: 100%;
  background-color: var(--white-010);
  margin-bottom: 30px;
  &:hover {
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-out;
    transform: scale(1.02);
  }
`;

const ImgBox = styled.div`
  display: flex;
  img {
    width: 180px;
    height: 180px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-around;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
  }
`;
const TagBox = styled.div`
  display: flex;
  margin-top: 10px;

  .tag-1 {
    margin-right: 10px;
  }
`;

const StarBox = styled.div`
  display: flex;
  .star-icon {
    color: var(--green-010);
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
  margin-left: 150px;
  button:hover {
    color: var(--green-010);
  }
`;

const UserReviewCard = () => {
  return (
    <ReviewCardWrapper>
      <ImgBox>
        <img
          src="https://imgorg.catch.co.kr/job/catchapply/main/catchcafe/CAFE_P-6-1.jpg"
          alt="리뷰이미지"
        />
      </ImgBox>
      <ContentBox>
        <h2>카페이름</h2>
        <p>
          아인슈페너 맛집이에요! 분위기도 좋아요! 다음에도 또 방문하겠습니다~
        </p>
        <TagBox>
          <Tag className="tag-1">#조용한</Tag>
          <Tag className="tag-2">#커피가맛있는</Tag>
        </TagBox>
        <StarBox>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Typography component="legend"></Typography>
            <Rating className="star-icon" name="read-only" value={4} readOnly />
          </Box>
        </StarBox>
      </ContentBox>
      <ButtonBox>
        <button>수정</button>
        <button>삭제</button>
      </ButtonBox>
    </ReviewCardWrapper>
  );
};

export default UserReviewCard;
