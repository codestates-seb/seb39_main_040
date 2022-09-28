import { Link, useParams } from "react-router-dom";
import CafeReviewCard from "./CafeReviewCard";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ReviewCardsWrapper = styled.div`
  margin-top: 20px;
  width: 870px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px 900px;
  .tooltip {
    display: inline-block;
    cursor: pointer;
    .tooltip-text {
      z-index: 100;
      display: none;
      position: absolute;
      max-width: 200px;
      box-shadow: rgba(149, 157, 165, 0.1) 0px 4px 10px;
      padding: 5px;
      font-size: 14px;
      color: var(--black-010);
      background: var(--gray-010);
    }
  }

  .tooltip:hover .tooltip-text {
    display: block;
  }

  .icon {
    margin: 2px 5px 0 0;
    color: var(--green-010);
    width: 25px;
    height: 25px;
  }
`;

const CafeReviewCards = () => {
  const { id } = useParams();
  return (
    <ReviewCardsWrapper>
      <Link to={`/cafe/${id}/reviews`}>
        <IconBox>
          <span className="tooltip">
            <FontAwesomeIcon className="icon" icon={faPenToSquare} />
            <span className="tooltip-text">리뷰쓰기</span>
          </span>
        </IconBox>
      </Link>
      <CafeReviewCard />
      <CafeReviewCard />
      <CafeReviewCard />
    </ReviewCardsWrapper>
  );
};

export default CafeReviewCards;
