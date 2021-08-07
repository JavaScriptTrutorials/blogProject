import { fetchUserLogOut } from "../../redux/user/userActions";
import { connect } from "react-redux";
import { Ul, Li,NavLinkS } from "./Navbar.style";

const SignedInLinks = (props) => {
    const handleLogOut = () => {
        props.logout();
    }
    return (
        <Ul className="right">
            <div className='left'>
                <Li><NavLinkS to='/category'>Categories</NavLinkS></Li>
            </div>
            <div className='right'>
                <Li><NavLinkS to='/' className="btn btn-floating pink lighten-1">{props.email}</NavLinkS></Li>
                <Li><NavLinkS to='/' onClick={handleLogOut}>Log Out</NavLinkS></Li>
            </div>
        </Ul>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(fetchUserLogOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);