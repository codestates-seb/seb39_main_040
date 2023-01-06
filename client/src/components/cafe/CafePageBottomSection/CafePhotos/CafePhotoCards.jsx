import CafePhotoCard from "./CafePhotoCard";
import React from "react";
import styled from "styled-components";

const CafePhotoCards = () => {
  return (
    <CafePhotoContainer>
      <CafePhotoCard />
    </CafePhotoContainer>
  );
};

export default CafePhotoCards;

const CafePhotoContainer = styled.div`
  width: 900px;
`;
