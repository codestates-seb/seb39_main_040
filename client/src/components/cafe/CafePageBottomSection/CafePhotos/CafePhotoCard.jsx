import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const CafePhotoCard = ({ cafeImages }) => {
  return (
    <CafePhotoWrapper>
      <TextBox>
        <FontAwesomeIcon className="icon" icon={faCircleInfo} />
        <span>사진을 확인해보세요.</span>
      </TextBox>
      <Box className="img-box" sx={{ width: 800, height: 600 }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {cafeImages.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.path}?w=248&fit=crop&auto=format`}
                alt={item.id}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </CafePhotoWrapper>
  );
};

export default CafePhotoCard;

const CafePhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  .img-box {
    margin-top: 30px;
  }
`;

const TextBox = styled.div`
  display: flex;
  .icon {
    margin: 2px 5px 0 0;
    color: var(--gray-020);
  }

  span {
    color: var(--black-010);
    font-size: 14px;
  }
`;
