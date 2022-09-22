import styled from "styled-components";

const Btn = styled.button`
    width: 100px;
    height: 40px;
    background-color: #AE9E8F;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    :hover {
        background-color: #967f6a;
    }
`

const Button = ({children}) => {
    return (
        <Btn>{children}</Btn>
    )
}

export default Button;