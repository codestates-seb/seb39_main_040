import React from "react";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Title>Not Found 🧐 </Title>
      <Text>This is not web page you are looking for.</Text>
    </NotFoundContainer>
  );
};

export default NotFoundPage;

const NotFoundContainer = styled.div`
  margin: 50px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 25px;
`;
