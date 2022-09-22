import styled from "styled-components";
import CafeItem from "../../cafe/CafeItem";

const WishWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const MyPageWishTab = () => {
  return (
    <WishWrapper>
      <CafeItem />
      <CafeItem />
      <CafeItem />
      <CafeItem />
    </WishWrapper>
  );
};

export default MyPageWishTab;
