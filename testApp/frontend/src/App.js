import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as actions from './actions';

class App extends Component {

  componentDidMount() {
    this.props.tryAutoSignin();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    IsAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignin: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
