import styled from "styled-components";

const MainWrapper = styled.div`
    width: 300px;
    height: 300px;
    margin-top: 20px;
    img {
        width: 300px;
        height: 300px;
    }
`

const CafeReviewImage = () => {
    return (
        <MainWrapper>
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0xIV1xjaD-bnh0XVrOGhe7hyHejLw9xDTYQ&usqp=CAU" />
        </MainWrapper>
    )
}

export default CafeReviewImage;