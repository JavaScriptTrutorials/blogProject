import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUserRegistration} from '../../redux/user/userActions';
import {isEmpty} from '../../utils/emptyString';

const SignUp = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const history = useHistory();

    useEffect(() => {
        if(props.user.isAuthenticated){
            history.push('/');
        }
        console.log(props.user);
    },[props.user, history]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password, nickname);
        props.signUp({email, password, nickname});
    };

    return (
        <div className="container">
            {props.user.loading ? 
                <div>Registration in progess...</div> :
                <form className="white" onSubmit={handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    {props.user.error && !isEmpty(props.user.error.email) && <span>{props.user.error.email}</span>}
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {props.user.error && !isEmpty(props.user.error.password) && <span>{props.user.error.password}</span>}
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="nickName">Nick Name</label>
                        <input type="text" id="nickName" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">SignUp</button>
                    </div>
                </form>
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (credentials) => dispatch(fetchUserRegistration(credentials))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
