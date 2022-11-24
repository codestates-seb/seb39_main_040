import Tag from "../../../common/Tag";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import React, { useState } from "react";
import ImageModal from "../../../common/ImageModal";

const CafeReviewCard = ({ text, tag, user, image, star }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <MainWrapper>
      <ImgBox>
        <img src={`${image}`} alt="리뷰이미지" onClick={showModal} />
      </ImgBox>
      <ModalBox>
        {modalOpen && <ImageModal setModalOpen={setModalOpen} image={image} />}
      </ModalBox>
      <ContentBox>
        <p>{text}</p>
        <TagBox>
          {tag.map((el) => (
            <Tag className="tag-1">#{el}</Tag>
          ))}
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
            <span>{user.name}</span>
          </Username>
        </Infobox>
      </ContentBox>
    </MainWrapper>
  );
};

export default CafeReviewCard;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 870px;
  height: 130px;
  background-color: var(--white-010);
  margin-bottom: 50px;
  position: relative;
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

const ModalBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
    width: 500px;
    height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 17px;
  width: auto;
  .tag-1 {
    margin-right: 10px;
  }
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
