import Tag from "../../../common/Tag";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 870px;
  height: 130px;
  background-color: var(--white-010);
  margin-bottom: 50px;
  position: relative;
  /* border: 1px solid black; */
`;

const ImgBox = styled.div`
  position: absolute;
  left: 0;
  margin-top: 39px;
  width: 190px;
  height: 170px;
  img {
    width: 130px;
    height: 130px;
  }
`;

const ContentBox = styled.div`
  position: relative;
  padding: 0 18px;
  width: 700px;
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

const Username = styled.div`
  position: absolute;
  right: 0;
  width: 50px;
  margin-top: 10px;
  font-size: 14px;
`;

const CafeReviewCard = ({ text, tag, user, image, star }) => {
  return (
    // <MainWrapper>
    //   <div className="image">
    //     <img src={`${image}`} alt="리뷰이미지" />
    //   </div>
    //   <Content>
    //     <div className="tag">
    //       <span>#{tag[0]}</span>
    //       <span>#{tag[1]}</span>
    //     </div>
    //     <p>{text}</p>
    //     <div className="info">
    //       <div className="star">
    //         <Box sx={{ "& > legend": { mt: 2 } }}>
    //           <Typography component="legend"></Typography>
    //           <Rating name="read-only" value={star} readOnly />
    //         </Box>
    //       </div>
    //       <div className="username">
    //         <span className="name">{user.name}</span>
    //       </div>
    //     </div>
    //   </Content>
    // </MainWrapper>
    <MainWrapper>
      <ImgBox>
        <img
          src="https://wishbeen-seoul.s3.ap-northeast-2.amazonaws.com/plan/1498208096160_17881746_1930702927147954_3202367211201101824_n.jpg"
          alt="리뷰이미지"
        />
      </ImgBox>
      <ContentBox>
        <p>
          조용해서 공부하기 좋았어요! 커피랑 디저트도 맛있어요! 근처에 이런
          카페가 생기니 너무 좋네요~
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
                value={star}
                readOnly
              />
            </Box>
          </Star>
          <Username>
            <span>김유정</span>
          </Username>
        </Infobox>
      </ContentBox>
    </MainWrapper>
  );
};

export default CafeReviewCard;
