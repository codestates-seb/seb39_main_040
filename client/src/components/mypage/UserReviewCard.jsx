import Tag from "../../components/common/Tag";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import React from "react";

const ReviewCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: var(--white-010);
  margin-bottom: 50px;
  position: relative;
  border: 1px solid black;
`;

const ReviewImg = styled.img`
  position: absolute;
  left: 10px;
  max-width: 20%;
  height: 170px;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  position: relative;
  padding: 0 20px;
  width: 70%;
  margin-left: 100px;
  margin-bottom: 25px;
  p {
    line-height: 30px;
    margin-bottom: 20px;
  }
`;

const TagBox = styled.div`
  margin: 8px 0 17px 0;
  font-size: 17px;
  width: 60px;
`;

const Infobox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-top: 23px;
  width: 640px;
`;

const Star = styled.div`
  position: absolute;
  left: 0;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  .star-icon {
    color: var(--green-010);
  }
`;

const ButtonBox = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  button {
    display: flex;
    flex-direction: row;
  }
`;

const UserReviewCard = () => {
  return (
    <ReviewCardWrapper>
      <ReviewImg
        src="https://wishbeen-seoul.s3.ap-northeast-2.amazonaws.com/plan/1498208096160_17881746_1930702927147954_3202367211201101824_n.jpg"
        alt="리뷰이미지"
      />
      <ContentBox>
        <p>
          요새 혼자 카페가서 공부하는게 습관이 되었는데 이번 기회에 좋은 카페를
          찾은 것 같아요!
        </p>
        <TagBox>
          <Tag>#조용한</Tag>
        </TagBox>
        <Infobox>
          <Star>
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Typography component="legend"></Typography>
              <Rating
                className="star-icon"
                name="read-only"
                // value={star}
                readOnly
              />
            </Box>
          </Star>
          <ButtonBox>
            <button>수정</button>
            <button>삭제</button>
          </ButtonBox>
        </Infobox>
      </ContentBox>
    </ReviewCardWrapper>
  );
};

export default UserReviewCard;
