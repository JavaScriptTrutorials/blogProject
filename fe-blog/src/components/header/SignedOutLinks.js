import { Ul, Li,NavLinkS } from "./Navbar.style";
const SignedOutLinks = (props) => {
    return (
        <Ul className="right">
            <Li><NavLinkS to='/register'>Signup</NavLinkS></Li>
            <Li><NavLinkS to='/login'>Login</NavLinkS></Li>
        </Ul>
    )
};
export default SignedOutLinks;