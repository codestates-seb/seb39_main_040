import styled from "styled-components";
import SimpleSlider from "../components/common/Carousel";
import Header from "../components/common/Header";
import CafeCards from "../components/cafe/CafeCards";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import React, { useState } from "react";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1600px;
    height: 80px;
  }
`;

const CarouselContainer = styled.div`
  width: 1700px;
  height: 800px;
`;

const FilterBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1370px;
`;

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [targetFilter, setTargetFilter] = useState(`all`);

  return (
    <MainWrapper>
      <Header />
      <CarouselContainer>
        <SimpleSlider />
      </CarouselContainer>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <FilterBarContainer>
        <FilterBar
          targetFilter={targetFilter}
          setTargetFilter={setTargetFilter}
        />
      </FilterBarContainer>
      <CafeCards
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        targetFilter={targetFilter}
        setTargetFilter={setTargetFilter}
      />
    </MainWrapper>
  );
};

export default MainPage;
