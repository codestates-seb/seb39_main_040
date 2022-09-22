import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

const ReviewItemWrapper = styled.div`
  //border: 1px solid red;
  width: 280px;
  height: 400px;
  background-color: #f0ece3;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const ReviewImg = styled.div`
  background-color: inherit;
  position: relative;
  img {
    width: 100%;
    height: 280px;
    //border-radius: 10px;
  }
  button {
    margin-top: 5px;
    background-color: transparent;
  }
  .button-delete {
    position: absolute;
    top: 5px;
    right: 25px;
    color: #735757;
    opacity: 0.7;
    font-size: 20px;
  }
  .button-edit {
    position: absolute;
    top: 5px;
    right: 0;
    color: #735757;
    opacity: 0.7;
    font-size: 20px;
  }
  button:hover {
    color: red;
  }
`;
const ReviewText = styled.p`
  background-color: inherit;
  font-size: 14px;
  color: #735757;
  margin: 10px;
  line-height: 24px;
`;

const ReviewItem = () => {
  return (
    <ReviewItemWrapper>
      <ReviewImg>
        <img src="https://mp-seoul-image-production-s3.mangoplate.com/356090/2138895_1642055167289_1642055158684.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80" />
        <button className="button-delete">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <Link to="/editreview">
          <button className="button-edit">
            <FontAwesomeIcon icon={faPenSquare} />
          </button>
        </Link>
      </ReviewImg>

      <ReviewText>
        오랜만에 먹은 아인슈페너와 티라미수... 너무 맛있게 잘먹었습니다ㅎㅎ
        다음에는 아이스크림 크로플도 먹으로 오겠습니다!!!
      </ReviewText>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;
