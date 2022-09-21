import styled from "styled-components";

// 카페아이템이 들어가는 데이터 -> 카페 대표 사진, 카페 이름, 카페 대표 태그 2개 = 총 3가지 데이터
// 아직 상세데이터가 나오지 않았으니 더미데이터로 간주해서 표현
// 그렇다면 상태관리 라이브러리를 이용해 상태를 관리 및 axios를 활용해 데이터 불러오기가 필요

const CafeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //border: 1px solid blue;
  width: 250px;
  height: 330px;
  margin-top: 50px;
  background-color: #f0ece3;
  border-radius: 10px;
`;

// 이미지 (img)
const CafeImg = styled.img`
  position: relative;
  border-radius: 10px 10px 0 0 ;
  width: 100%;
  height: 200px;
`;

// 이름 (title)
const CafeTitle = styled.h2`
  color: #735757;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 10px;
  background: none;
  margin-left: 5px;
`;

// 카페태그 (cafeTag)
const CafeTag = styled.div`
  color: #735757;
  font-size: 1rem;
  margin-top: 10px;
  margin-left: 5px;
  background: none;
`;

const CafeItem = () => {
  return (
      <CafeItemWrapper>
        <div>
          <CafeImg src="https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic3.jpg" />
        </div>
        <CafeTitle>MODE</CafeTitle>
        <CafeTag># 분위기가 좋은</CafeTag>
        <CafeTag># 커피가 맛있는</CafeTag>
      </CafeItemWrapper>
  );
};

export default CafeItem;
