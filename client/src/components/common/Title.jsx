import styled from "styled-components";
import TitleImg1 from "../../assets/title1.svg";

const TitleWrapper = styled.div`
  // margin-top: 20px;
`;

const Title = () => {
  return (
    <TitleWrapper>
      <img src={TitleImg1} alt="title-img"></img>
    </TitleWrapper>
  );
};

export default Title;
