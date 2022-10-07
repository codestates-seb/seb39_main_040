import styled from "styled-components";
import SimpleSlider from "../components/common/Carousel";
import Header from "../components/common/Header";
import CafeCards from "../components/cafe/CafeCards";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/common/Footer";

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [targetFilter, setTargetFilter] = useState(`all`);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/cafe`).then((res) => {
      console.log(res.data.pageInfo.total_page);
      setTotalPage(res.data.pageInfo.total_page);
    });
  }, []);

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
        totalPage={totalPage}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        targetFilter={targetFilter}
        setTargetFilter={setTargetFilter}
      />
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </MainWrapper>
  );
};

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

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

const FooterContainer = styled.div`
  /* position: absolute; */
  /* bottom: 0; */
  margin-top: 600px;
  width: 100%;
`;
