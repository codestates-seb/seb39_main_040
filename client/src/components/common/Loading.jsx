import React from "react";
import styled from "styled-components";
import Spinner from "../../assets/Spinner.gif";

const Loading = () => {
  return (
    <Background>
      <img src={Spinner} alt="로딩이미지" />
    </Background>
  );
};

export default Loading;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
