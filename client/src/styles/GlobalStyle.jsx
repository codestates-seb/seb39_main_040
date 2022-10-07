import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    font-family: 'Noto Sans KR', sans-serif;
  }

  ul, li {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
  }
  :root {
    //footer 부분 색상
    --gray-010: #F7F9FA;
    //연한 회색 글씨 색상(리뷰작성 세부설명)
    --gray-020: #B3B3B3;
    // 리뷰작성, 마이페이지 등 연한 회색 border 색상
    --gray-030: #dcdcdc;
    // 컨셉 색상
    --green-010: #809A6F;
    --green-020: #738568;
    --black-010: #000000;
    --white-010: #ffffff;
    --red-010: #e64848;
  }
`;
export default GlobalStyle;
