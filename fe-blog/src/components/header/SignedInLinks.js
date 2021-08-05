import { NavLink } from "react-router-dom";
import { fetchUserLogOut } from "../../redux/user/userActions";
import { connect } from "react-redux";

const SignedInLinks = (props) => {
    const handleLogOut = () => {
        props.logout();
    }
    return (
        <ul className="right">
            <li><NavLink to='/'>New Project</NavLink></li>
            <li><NavLink to='/' onClick={handleLogOut}>Log Out</NavLink></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">{props.email}</NavLink></li>
        </ul>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(fetchUserLogOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);