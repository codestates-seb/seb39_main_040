import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

// 전체리뷰 컨테이너 + 사진컨테이너
const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 850px;
  height: 170px;
  background-color: #f0ece3;
  border-radius: 10px;
  margin: 20px 0;
  position: relative;

  .image {
    position: absolute;
    left: 0;
    width: 190px;
    height: 170px;
    img {
      border-radius: 10px 0 0 10px;
      width: 190px;
      height: 170px;
    }
  }
`;

// 텍스트, 별점, 유저이름
const Content = styled.div`
  position: relative;
  background-color: #f0ece3;
  padding: 0 18px;
  width: 620px;
  margin-left: 170px;
  .tag {
    background-color: #f0ece3;
    margin: 10px 0 15px 0;
    font-size: 17px;
    span {
      background-color: #f0ece3;
      margin-right: 10px;
    }
  }
  p {
    background-color: #f0ece3;
    line-height: 30px;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-top: 20px;
    width: 640px;

    .star {
      position: absolute;
      left: 0;
      /* width: 540px; */
      align-items: center;
      justify-content: center;
      margin-left: 15px;
      background-color: #f0ece3;
    }
    .name {
      position: absolute;
      right: 0;
      width: 50px;
      /* margin-left: 100px; */
      background-color: #f0ece3;
    }
  }
`;

const CafeReviewItem = ({ text, tag, user, image, star }) => {
  return (
    <MainWrapper>
      <div className="image">
        <img src={`${image}`} alt="리뷰이미지" />
      </div>
      <Content>
        <div className="tag">
          <span>#{tag[0]}</span>
          <span>#{tag[1]}</span>
          <span>#조용함</span>
        </div>
        <p>{text}</p>
        <div className="info">
          <div className="star">
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Typography component="legend"></Typography>
              <Rating name="read-only" value={star} readOnly />
            </Box>
          </div>
          <div className="username">
            <span className="name">{user.name}</span>
          </div>
        </div>
      </Content>
    </MainWrapper>
  );
};

export default CafeReviewItem;
