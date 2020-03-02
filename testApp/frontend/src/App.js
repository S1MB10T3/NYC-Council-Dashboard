import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import * as actions from './actions';


class App extends Component {

  componentDidMount() {
    this.props.tryAutoSignin();
  }

  render() {
    const ProtectedRoute = ({component: Component, ...rest}) => {
      return (
        <Route
          {...rest}
          render={props => {
            if (actions.IsAuthenticated()) {
              return <Component {...props} />;
            } else {
              return <Redirect to={
                {
                  pathname: "/login",
                  state: {
                    from: props.location
                  }
                }
              } />
            }
          }
        } />
      );
    };

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <ProtectedRoute path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
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
