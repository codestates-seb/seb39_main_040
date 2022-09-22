import styled from "styled-components";


const MainWrapper = styled.div`
   display: block;
   align-items: center;
   justify-content: center;
   width: 420px;
   height: 60px;
   margin-top: 30px;
   

   .category {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 420px;
    background-color: #F0ECE3;
    box-shadow: 0 5px 4px -3px rgba(0, 0, 0, 0.2);
    
    button {
        border: none;
        /* display: flex; */
        width: 105px;
        height: 40px;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background : #F0ECE3;
        font-size: 16px;
       }   
       button:hover {
        background-color: #DACAA5;
       }
       button:nth-child(-n+3) {
        border-right: 1px solid black;
       }
   }
`

const TagCategory = () => {
    return (
        <MainWrapper>
            <div className="category">
                <button>All</button>
                <button>포토존</button>
                <button>맛집</button>
                <button>스터디</button>

            </div>
        </MainWrapper>       
    )
}

export default TagCategory;