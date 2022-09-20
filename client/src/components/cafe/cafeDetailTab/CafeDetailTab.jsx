import CafeDetailMap from "../../map/CafeDetailMap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .first-box {
        display: flex;
        justify-content: center;
        align-items: center;

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 500px;
            height: 400px;
            /* border: 1px solid black; */

            p {
                position: absolute;
                top: 0;
                margin: 10px 0 20px 0;
            }

            ul {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 30px;
                width: 300px;
                height: 260px;

                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .icon {
                        margin-right: 15px;
                        color: #735757;
                    }

                }
                li {
                    line-height: 50px;
                    font-size: 18px;
                    width: 250px;
                    height: 50px;
                    margin: 7px 0;
                    border-bottom: 1px solid #93857c;
                }

            }
            
        }
        // 구분선 만들기
        /* .left::after {
            display: inline-block;
            content: "";
            width: 1px;
            height: 10px;
            background-color: #e1e1e1;
            margin-right: 10px;
        } */

        .right {
            width: 500px;
            height: 400px;
            margin-left: 10px;
            border: 1px solid black;
        }
    }

    .second-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-top: 40px;
        /* border: 1px solid black; */
        width: 500px;
        height: 700px;

        p {
            position: absolute;
            top: 0;
            margin-top: 10px;
        }

        .cafe-image {
            /* border: 1px black dotted; */
            width: 450px;
            height: 600px;
            img {
                width: 450px;
                height: 600px;
            }
        }
    }

`


const CafeDetailTab = () => {
    return (
        <MainWrapper>
            <div className="first-box">
                <div className="left">
                    <p>디저트가 맛있고 조용한 카페</p>
                    <ul>
                        <div>
                            <FontAwesomeIcon  className="icon" icon={faClock}/>
                            <li>영업시간 : 9:00 ~ 22:00</li>
                        </div>
                        <div>
                            <FontAwesomeIcon  className="icon" icon={faPhone}/>
                            <li>0503-3445-8573</li>
                        </div>
                        <div>
                            <FontAwesomeIcon  className="icon" icon={faSquareInstagram}/>
                            <li>cafe_Maison_ete</li>
                        </div>
                        <div>
                            <FontAwesomeIcon  className="icon" icon={faLocationDot}/>
                            <li>서울 강남구 도산대로 49길 39</li>
                        </div>
                    </ul>
                </div>

                <div className="right">
                    <p>Location</p>
                    <div>
                        <CafeDetailMap />
                    </div>
                </div>
            </div>

            <div className="second-box">
                <p>Menu</p>
                <div className="cafe-image">
                    <img src="https://marketplace.canva.com/EAD1VGcQX1w/1/0/1236w/canva-%EC%A7%99%EC%9D%80-%EA%B0%88%EC%83%89-%EC%BB%A4%ED%94%BC-%EC%B9%B4%ED%8E%98-%EB%A9%94%EB%89%B4-5Edm1LHJ4-s.jpg" />
                </div>
            </div>
        </MainWrapper>
    )
}

export default CafeDetailTab;