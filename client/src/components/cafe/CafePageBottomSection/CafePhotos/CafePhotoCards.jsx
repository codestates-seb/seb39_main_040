import CafePhotoCard from "./CafePhotoCard";
import React from "react";
import styled from "styled-components";

const CafePhotoContainer = styled.div`
  width: 900px;
`;

const CafePhotoCards = ({ cafeIdInfo, cafeImages }) => {
  return (
    <CafePhotoContainer>
      <CafePhotoCard cafeIdInfo={cafeIdInfo} cafeImages={cafeImages} />
    </CafePhotoContainer>
  );
};

export default CafePhotoCards;
