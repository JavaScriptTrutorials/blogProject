import {useState, useEffect} from 'react';
import { fetchUserLogin } from '../../redux/user/userActions';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';

const SignIn = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    useEffect(() => {
        if(props.user.isAuthenticated){
            history.push('/');
        }
    },[props.user, history]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password);
        props.signIn({email, password});
    };

    return (
        <div className="container">
            {props.user.loading ? 
                <div>Login in progess...</div> :
                <form className="white" onSubmit={handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    {props.user.error && !(props.user.error.email === '') && <span>{props.user.error.email}</span>}
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {props.user.error && !(props.user.error.password === '') && <span>{props.user.error.password}</span>}
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
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
        signIn: (credentials) => dispatch(fetchUserLogin(credentials))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
