import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';
import reduxLogger from 'redux-logger';
import jwt from 'jsonwebtoken';
import { fetchUserLoginSuccess } from './redux/user/userActions';


const store = createStore(rootReducer, applyMiddleware(reduxThunk, reduxLogger));

const token = localStorage.getItem('jwt');
if(token){
  const dataFromToken = jwt.decode(token);
  store.dispatch(fetchUserLoginSuccess(dataFromToken));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
