import styled from "styled-components";
import SideMenu from './SideMenu';

export const MainPage = styled.div`
    background-color: coral;
    .container {
        width: 1024px;
        margin: 0 auto;
        overflow: hidden;
    }
`;
export const Menu = styled(SideMenu)`
    float: left;
    width: 15%;
    background-color: #eee;
`;

export const MainContent = styled.div`
    float: left;
    width: 85%;
    background-color: lightgray;
`;