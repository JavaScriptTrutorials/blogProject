import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {connect} from 'react-redux';

const Navbar = (props) => {
    return (
        <nav className={props.className}>
            <div className="container">
                <Link to='/' className='brand-logo'>PlanApp</Link>
                {props.user.isAuthenticated ? <SignedInLinks email={props.user.data.email}/> : <SignedOutLinks/>}
                
                
            </div>
        </nav>
    )
};
const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Navbar);