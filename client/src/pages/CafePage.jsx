import styled from "styled-components";
import CafeInfo from "../components/cafe/CafeInfo";
import CafeTab from "../components/tab/CafeTab";

const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
`
const Header = styled.div`
    display: flex;
    background-color: #F7F7F7;
    width: 100%;
    height: 40px;      
    justify-content: center;
    align-items: center;
`

const CafePage = () => {
    return (
        <MainWrapper>
            <Header> header </Header>
            <CafeInfo />
            <CafeTab/>
        </MainWrapper>
    )
}
 
export default CafePage;