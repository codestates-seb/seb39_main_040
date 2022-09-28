import CafeCard from "./CafeCard";
import styled from "styled-components";

const CafeCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1500px;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  div {
    width: 300px;
    margin-right: 50px;
  }
`;

const CafeCards = ({ cafeInfo }) => {
  return (
    <CafeCardWrapper>
      {/* {cafeInfo.map((el) => (
          <div>
            <CafeCard
              key={el.id}
              id={el.id}
              title={el.name}
              tags={el.tags}
              image={el.main_img}
            />
          </div>
        ))} */}
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
      <div>
        <CafeCard />
      </div>
    </CafeCardWrapper>
  );
};

export default CafeCards;
