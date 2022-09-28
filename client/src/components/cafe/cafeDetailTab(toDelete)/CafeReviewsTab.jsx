import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CafeReviewItem from "./CafeReviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .button-box {
    position: relative;
    height: 40px;
    button {
      cursor: pointer;
      position: absolute;
      right: 0;
      .icon {
        color: #735757;
      }
    }
  }
`;
const CafeReviewsTab = () => {
  const { id } = useParams();
  const [reviewIdInfo, setReviewIdInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://175.125.6.189/cafe/${id}/reviews`)
      .then((res) => {
        setReviewIdInfo(res.data.data);
      })
      .catch((err) => console.err("err:", err));
  }, []);

  return (
    <MainWrapper>
      <div className="button-box">
        <Link to={`/cafe/${id}/reviews`}>
          <button>
            <FontAwesomeIcon className="icon" icon={faPenToSquare} size="2x" />
          </button>
        </Link>
      </div>
      {reviewIdInfo.map((el) => (
        <CafeReviewItem
          text={el.description}
          key={el.id}
          tag={el.tags}
          user={el.user}
          image={el.review_img}
          star={el.score}
        />
      ))}
    </MainWrapper>
  );
};

export default CafeReviewsTab;
