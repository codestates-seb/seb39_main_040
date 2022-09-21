import styled from "styled-components";


const MainWrapper = styled.div`
    display: block;
   align-items: center;
   justify-content: center;
   width: 350px;
   height: 60px;
   margin-top: 30px;

   .filter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    background-color: #F0ECE3;
    box-shadow: 0 5px 4px -3px rgba(0, 0, 0, 0.2);
    margin: 7px 0 0 185px;
    button {
        width: 80px;
        height: 30px;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        background : #F0ECE3;
       }   
       button:hover {
        background-color: #DACAA5;
       }
       button:nth-child(1) {
        border-right: 1px solid black;
       }
   }
`


const Filter = () => {
    return (
        <MainWrapper>
            <div className="filter">
                <button>최신순</button>
                <button>인기순</button>
            </div>
        </MainWrapper>
    )
}

export default Filter