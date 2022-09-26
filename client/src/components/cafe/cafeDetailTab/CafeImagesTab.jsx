import styled from "styled-components";
import CafeReviewImage from "./CafeReviewImage";

const MainWrapper = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1020px;

  .images {
    width: 300px;
    height: 100%;
    margin-bottom: 25px;
    margin-right: 30px;
  }
`;

const CafeImagesTab = () => {
  return (
    <MainWrapper>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
      <div className="images">
        <CafeReviewImage />
      </div>
    </MainWrapper>
  );
};

export default CafeImagesTab;
