import styled from "styled-components";
import CafeReviewImage from "../CafeReviewImage";

const MainWrapper = styled.div`
    /* height: 100vh; */
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
    

`

const CafeImagesTab = () => {
    return (
        <MainWrapper>
            {/* map으로 데이터 조회 예정 */}
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
    )
}

export default CafeImagesTab;