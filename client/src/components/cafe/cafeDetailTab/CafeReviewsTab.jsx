import { Link } from "react-router-dom";
import styled from "styled-components";
import CafeReviewItem from "./CafeReviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .button-box {
    position: relative;
    height: 40px;
    button {
      position: absolute;
      right: 0;
      .icon {
        color: #735757;
      }
    }
  }
`;
const CafeReviewsTab = () => {
  return (
    <MainWrapper>
      <div className="button-box">
        <Link to="/newreview">
          <button>
            <FontAwesomeIcon className="icon" icon={faPenToSquare} size="2x" />
          </button>
        </Link>
      </div>
      {/* map메서드 사용예정 */}
      <CafeReviewItem />
      <CafeReviewItem />
      <CafeReviewItem />
      <CafeReviewItem />
      <CafeReviewItem />
      <CafeReviewItem />
      <CafeReviewItem />
    </MainWrapper>
  );
};

export default CafeReviewsTab;
