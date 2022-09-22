import styled  from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MainWrapper = styled.div`
    display: flex;
    width: 350px;
    /* align-items: center; */
    justify-content: center;
    margin: 15px 10px 0 0;

    .icon {
        color: #735757;
        margin: 0 10px;
    }

    input {
        width: 350px;
        border: none;
        border-bottom: 1px solid #735757;
        font-size: 17px;
    }
    input:focus {
        outline: none;
    }
    

`

const Search = () => {
    return (
            <MainWrapper>
                <div>
                    <FontAwesomeIcon  className="icon" icon={faMagnifyingGlass} size="2x" />
                </div>
                <input type="text" name="name" />
                <div>
                    <FontAwesomeIcon  className="icon" icon={faLocationDot} size="2x" />
                </div>
            </MainWrapper>
    )
}

export default Search;