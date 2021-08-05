import { NavLink } from "react-router-dom";
const SignedOutLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/register'>Signup</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
        </ul>
    )
};
export default SignedOutLinks;