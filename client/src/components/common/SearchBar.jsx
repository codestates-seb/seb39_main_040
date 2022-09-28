import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const SearchWrapper = styled.div`
  width: 880px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
const TextBox = styled.div`
  p {
    font-size: 25px;
    font-weight: 700;
  }
`;
const BarBox = styled.div`
  margin-top: 35px;
  position: relative;
  input {
    height: 65px;
    width: 780px;
    font-size: 20px;
    border-radius: 30px;
    border: 1px solid var(--green-010);
    -webkit-appearance: none; // 기본 search 디자인을 없앰
    margin-left: 10px;
    padding: 0 20px 0 80px;
    overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
    z-index: -1;
    :focus {
      outline: none;
      text-align: left;
    }
    :hover {
      box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
      transition: 0.1s ease-out;
    }
  }
  .search {
    position: absolute;
    right: 720px;
    top: 15px;
    font-size: 35px;
    color: var(--green-010);
  }
  .marker {
    position: absolute;
    left: 710px;
    top: 15px;
    font-size: 35px;
    color: var(--green-010);
  }
`;

const SearchBar = () => {
  return (
    <SearchWrapper>
      <TextBox>
        <p>원하는 카페가 있으신가요?</p>
      </TextBox>
      <BarBox>
        <FontAwesomeIcon className="search" icon={faMagnifyingGlass} />
        <input type="search" placeholder="카페 이름으로 검색해보세요" />
        <FontAwesomeIcon className="marker" icon={faLocationDot} />
      </BarBox>
    </SearchWrapper>
  );
};

export default SearchBar;
