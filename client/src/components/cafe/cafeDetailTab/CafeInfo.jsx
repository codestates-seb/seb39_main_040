import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F0ECE3;
    height: 460px;
    width: 100%;
    margin-top: 70px;
    
    
    div {
        background-color: #F0ECE3;
    }

    div.img-box {
        width: 700px;
        height: 300px;
        img {
            width: 700px;
            height: 300px; 
        }
    }

    div.title-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;   
        p {
            background-color: #F0ECE3;
            margin: 0 15px;
            font-size: 25px;
            font-weight: 500;
        }
        button {
            border: none;
            font-size: 30px;
        }
    }

    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        background-color: #F0ECE3;
        li {
        background-color: #F0ECE3;
        margin: 0 10px;
        font-size: 15px;
    }
    }

    

`


const CafeInfo = () => {
    return (
        <Wrapper>
            <div className="img-box"><img src="https://images.squarespace-cdn.com/content/v1/54588808e4b0d75692c47323/1566451308360-TRF71T89E8P6SEHD5QB3/%E1%84%8F%E1%85%A1%E1%84%91%E1%85%A6+%E1%84%8B%E1%85%A9%E1%86%AB%E1%84%92%E1%85%AA_1_2.jpg" /></div>
            <div className="title-box">
              <p>카페이름</p>
              <button>♥︎</button>
            </div>
            <ul>
                <li>#태그</li>
                <li>#태그</li>
                <li>#태그</li>
            </ul>
        </Wrapper>
    )
}

export default CafeInfo;