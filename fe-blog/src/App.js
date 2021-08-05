import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/header/Navbar';
import MainPageComponent from './components/main/MainPageComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={MainPageComponent}/>
          <Route path='/register' component={SignUp} />
          <Route path='/login' component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
