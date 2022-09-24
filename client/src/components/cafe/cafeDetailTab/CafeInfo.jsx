import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0ece3;
  height: 460px;
  width: 100%;
  margin-top: 70px;

  div {
    background-color: #f0ece3;
  }

  div.img-box {
    width: 700px;
    height: 300px;
    img {
      width: 700px;
      height: 300px;
    }
  }

  div.title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    p {
      background-color: #f0ece3;
      margin: 0 15px;
      font-size: 25px;
      font-weight: 500;
    }
    button {
      border: none;
      font-size: 30px;
      cursor: pointer;
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    background-color: #f0ece3;
    li {
      background-color: #f0ece3;
      margin: 0 10px;
      font-size: 15px;
    }
  }
`;

const CafeInfo = ({ cafeIdInfo }) => {
  // console.log(cafeIdInfo.main_img);
  return (
    <Wrapper>
      <div className="img-box">
        <img src={`${cafeIdInfo.main_img}`} alt="카페사진" />
      </div>
      <div className="title-box">
        <p>{cafeIdInfo.name}</p>
        <button>♥︎</button>
      </div>
      <ul>
        {/* 태그데이터 조회하는 방법 알아보기 */}
        <li>#{cafeIdInfo.tags}</li>
        {/* <li>#{cafeIdInfo.tags[1]}</li> */}
        <li>#태그</li>
      </ul>
    </Wrapper>
  );
};

export default CafeInfo;
