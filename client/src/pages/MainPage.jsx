import styled from "styled-components";
import Search from "../components/cafe/cafeMain/Search";
import TagCategory from "../components/cafe/cafeMain/TagCategory";
import MainTitle from "../components/common/MainTitle";
import Filter from "../components/cafe/cafeMain/Filter";
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
      <MainTitle>CAFELIST</MainTitle>
      <div className="nav">
        <Search />
        <TagCategory />
        <Filter />
      </div>
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
