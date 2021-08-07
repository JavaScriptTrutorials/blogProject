import styled from "styled-components";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

export const NavbarStyled = styled(Navbar)`
background-color: coral;
.container {
    width: 1024px;
    margin: 0 auto;
    overflow: hidden;
}
.brand-logo {
    float: left;
    color: white;
    text-decoration: none;
    padding: 6px 10px 6px 0;
    font-size: 2em;
    font-weight: bold;
}
`;

export const Ul = styled.ul`
    & .right{
        float: right;
    }
    & .left{
        float: left;
    }
`;

export const Li = styled.li`
    display: inline-block;
`;

export const NavLinkS = styled(NavLink)`
text-decoration: none;
color: white;
padding: 20px 10px;
&:hover{
    background-color: lightsalmon;
}
`;

