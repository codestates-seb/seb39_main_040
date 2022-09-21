import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

// 카페아이템이 들어가는 데이터 -> 카페 대표 사진, 카페 이름, 카페 대표 태그 2개 = 총 3가지 데이터
// 아직 상세데이터가 나오지 않았으니 더미데이터로 간주해서 표현
// 그렇다면 상태관리 라이브러리를 이용해 상태를 관리 및 axios를 활용해 데이터 불러오기가 필요

const CafeItemWrapper = styled.div`
  //border: 1px solid red;
  //border-radius: 10px;
  width: 280px;
  height: 400px;
  background-color: #f0ece3;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const CafeImg = styled.div`
  background-color: inherit;
  position: relative;
  img {
    width: 100%;
    height: 280px;
    //border-radius: 10px;
  }
  button {
    position: absolute;
    top: 5px;
    right: 0;
    cursor: pointer;
    margin-top: 2px;
    font-size: 20px;
    color: #735757;
    opacity: 0.7;
  }

  button:hover {
    color: red;
    opacity: 0.7;
  }
`;

const CafeTitle = styled.div`
  background-color: inherit;
  font-size: 1.5rem;
  margin: 10px 0 10px 5px;
  color: #735757;
  font-weight: bold;
`;

const CafeTag = styled.div`
  background-color: inherit;
  font-size: 1rem;
  margin: 10px 0 10px 5px;
  color: #735757;
`;

const CafeItem = () => {
  return (
    <CafeItemWrapper>
      <CafeImg>
        <img src="https://imgorg.catch.co.kr/job/catchapply/main/catchcafe/CAFE_P-1-1.jpg" />
        <button>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </CafeImg>
      <CafeTitle>MODE</CafeTitle>
      <CafeTag># 분위기좋은</CafeTag>
      <CafeTag># 디저트가맛있는</CafeTag>
    </CafeItemWrapper>
  );
};

export default CafeItem;
