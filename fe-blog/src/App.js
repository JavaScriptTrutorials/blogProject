import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Categories from './components/categories/Categories';
import Navbar from './components/header/Navbar';
import MainPageComponent from './components/main/MainPageComponent';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={MainPageComponent}/>
          <Route path='/register' component={SignUp} />
          <Route path='/login' component={SignIn} />
          <Route path='/category' component={Categories} />
          <Route path='*' component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
