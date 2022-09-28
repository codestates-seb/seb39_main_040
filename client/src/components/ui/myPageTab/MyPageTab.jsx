import React, { useState } from "react";
import styled from "styled-components";
import MyPageTabContent from "./MyPageTabContent";
const TabWrapper = styled.div`
  display: block;
  align-items: center;
  justify-content: center;

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    //background-color: #f0ece3;

    button {
      border: none;
      /* display: flex; */
      width: 105px;
      height: 45px;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: #f0ece3;
      span {
        background: #f0ece3;
      }
    }
    button:hover {
      background-color: #dacaa5;
      span {
        background-color: #dacaa5;
      }
    }
    button:nth-child(1) {
      border-right: 1px solid black;
    }

    button:nth-child(2) {
      border-right: 1px solid black;
    }
    button.active {
      background-color: #dacaa5;
      span.active {
        background-color: #dacaa5;
      }
    }
  }

  .tab-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* position: absolute;
    top: 50%;
    left: 50%; */
    margin-top: 30px;
  }
`;

const MyPageTab = () => {
  const [clickedTab, setClickedTab] = useState(0);

  return (
    <TabWrapper>
      <div className="tab">
        <button
          eventKey="0"
          onClick={() => setClickedTab(0)}
          className={`${clickedTab === 0 ? "active" : ""}`}
        >
          나의정보
        </button>
        <button
          eventKey="1"
          onClick={() => setClickedTab(1)}
          className={`${clickedTab === 1 ? "active" : ""}`}
        >
          찜한카페
        </button>
        <button
          eventKey="2"
          onClick={() => setClickedTab(2)}
          className={`${clickedTab === 2 ? "active" : ""}`}
        >
          나의리뷰
        </button>
      </div>
      <div className="tab-content">
        <MyPageTabContent clickedTab={clickedTab} />
      </div>
    </TabWrapper>
  );
};

export default MyPageTab;
