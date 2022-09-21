import styled from "styled-components";
import Search from "../components/cafe/cafeMain/Search";
import TagCategory from "../components/cafe/cafeMain/TagCategory";
import MainTitle from "../components/ui/MainTitle";
import Filter from "../components/cafe/cafeMain/Filter";
import CafeListItem from "../components/cafe/CafeListItem";

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
            /* height: 340px; */
            /* margin-bottom: 10px; */
            margin-right: 30px;
        }
    }
`


const MainPage = () => {
    return (
        <MainWrapper>
            <MainTitle>CAFELIST</MainTitle>
            <div className="nav">
                <Search /> 
                <TagCategory /> 
                <Filter />
            </div>
            <div className="cafelist">
                {/* map 사용해서 데이터 뿌리기 */}
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
                <div className="cafeitem">
                    <CafeListItem />
                </div>
            </div>
        </MainWrapper>
    )
}

export default MainPage;