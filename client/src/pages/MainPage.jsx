import styled from "styled-components";
import Title from "../components/common/Title";
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
    width: 1400px;
    height: 80px;
  }
`;

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <MainWrapper>
      <Header />
      <Title />
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <FilterBar />
      <CafeCards searchInput={searchInput} setSearchInput={setSearchInput} />
    </MainWrapper>
  );
};

export default MainPage;
