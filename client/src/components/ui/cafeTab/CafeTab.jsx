import React, { useState } from "react";
import styled from "styled-components";
import CafeTabContent from "./CafeTabContent";

const TabWrapper = styled.div`
  display: block;
  align-items: center;
  justify-content: center;

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    background-color: #f0ece3;
    box-shadow: 0 5px 4px -3px rgba(0, 0, 0, 0.2);

    button {
      border: none;
      width: 105px;
      height: 45px;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: #f0ece3;
      cursor: pointer;
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
    margin-top: 20px;
  }
`;

const CafeTab = ({ cafeIdInfo }) => {
  const [clickedTab, setClickedTab] = useState(0);

  return (
    <TabWrapper>
      <div className="tab">
        <button
          eventKey="0"
          onClick={() => setClickedTab(0)}
          className={`${clickedTab === 0 ? "active" : ""}`}
        >
          세부정보
        </button>
        <button
          eventKey="1"
          onClick={() => setClickedTab(1)}
          className={`${clickedTab === 1 ? "active" : ""}`}
        >
          리뷰(
          <span className={`${clickedTab === 1 ? "active" : ""}`}>
            {cafeIdInfo.review_count}
          </span>
          )
        </button>
        <button
          eventKey="2"
          onClick={() => setClickedTab(2)}
          className={`${clickedTab === 2 ? "active" : ""}`}
        >
          사진
        </button>
      </div>
      <div className="tab-content">
        <CafeTabContent clickedTab={clickedTab} cafeIdInfo={cafeIdInfo} />
      </div>
    </TabWrapper>
  );
};

export default CafeTab;
