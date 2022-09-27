import styled from "styled-components";

import Title from "../components/common/Title";

import CafeCard from "../components/cafe/CafeCard";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1400px;
    height: 80px;
  }

  .cafelist {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 1200px;
    align-items: center;
    justify-content: center;
    .cafeitem {
      width: 250px;
      margin-right: 30px;
    }
  }
`;

const MainPage = ({ cafeInfo }) => {
  return (
    <MainWrapper>
      <Title>CAFELIST</Title>
      <div className="cafelist">
        {cafeInfo &&
          cafeInfo.map((el) => (
            <div className="cafeitem">
              <CafeCard
                key={el.id}
                id={el.id}
                title={el.name}
                tags={el.tags}
                image={el.main_img}
              />
            </div>
          ))}
      </div>
    </MainWrapper>
  );
};

export default MainPage;
