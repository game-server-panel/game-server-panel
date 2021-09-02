//MODULES
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

//JS
import 'bootstrap/dist/js/bootstrap';

//JSX
import Homescreen from './Screens/Homescreen';
import CreateServerScreen from './Screens/CreateServerScreen';
import Navbar from './Components/Navbar';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import ContainerScreen from './Screens/ContainerScreen';
import ConsoleScreen from './Screens/ConsoleScreen';
import Error404 from './Screens/Error404';
import FilemanagerScreen from './Screens/FilemanagerScreen';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Homescreen}></Route>
        <Route exact path="/login" component={LoginScreen}></Route>
        <Route exact path="/register" component={RegisterScreen}></Route>
        <Route exact path="/createserver" component={CreateServerScreen}></Route>
        <Route exact path="/container/:id" component={ContainerScreen}></Route>
        <Route exact path="/console/:id" component={ConsoleScreen}></Route>
        <Route exact path="/filemanager/:id" component={FilemanagerScreen}></Route>

        <Route path="*" component={Error404}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();