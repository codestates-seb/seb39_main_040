import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    background-color: #F7F7F7;
  }
  body {
    height: 100%;
    width: 100%;
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
    cursor: pointer;
  }

 
`;

export default GlobalStyle;