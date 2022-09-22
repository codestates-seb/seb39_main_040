import styled from "styled-components";

const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 850px;
    height: 170px;
    background-color: #F0ECE3;
    border-radius: 10px;
    margin: 20px 0;

    .image {
        width: 190px;
        height: 170px;
        img {
            border-radius: 10px 0 0 10px;
            width: 190px;
            height: 170px;
        }
    }
    .content {
        position: relative;
        background-color: #F0ECE3;
        padding: 0 18px;
        .tag {
            background-color: #F0ECE3;
            margin: 10px 0 15px 0;
            font-size: 17px;
                span {
                    background-color: #F0ECE3;
                    margin-right: 10px;
                }
            }
        p {
            background-color: #F0ECE3;
            line-height: 30px;
            margin-bottom: 10px;
        }
        .username {
            position: absolute;
            right: 0;
            margin-right: 20px;
            background-color: #F0ECE3;
            font-size: 16px;
        }
    }

`

const CafeReviewItem = () => {
    return (
        <MainWrapper>
            <div className="image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0xIV1xjaD-bnh0XVrOGhe7hyHejLw9xDTYQ&usqp=CAU" />
            </div>
            <div className="content">
                <div className="tag">
                    <span>#뷰맛집</span>
                    <span>#디저트맛집</span>
                    <span>#조용함</span>
                </div>
                <p>뷰 맛집! 사장님도 친절하시고 분위기도 좋아서 자주 올 것 같아요! 조용한 분위기에 디저트도 맛있어요!</p>
                <span className="username">한소희</span>
            </div>
        </MainWrapper>
    )
}

export default CafeReviewItem;