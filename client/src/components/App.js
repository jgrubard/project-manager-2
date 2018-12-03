import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { fetchUsersFromServer, getUserFromToken, fetchProjectsFromServer } from '../store';

import Nav from './Nav';
import Home from './Home';

import AuthRoute from './Authorization/AuthRoute';
import MainProjectPage from './Projects/MainProjectPage';

class App extends Component {
  constructor() {
    super();
    this.state = { dashNavOpen: false }
    this.grabNavStatus = this.grabNavStatus.bind(this);
  }

  grabNavStatus(status) {
    this.setState({ dashNavOpen: status });
  }

  componentDidMount() {
    const { loadUser, loadUsers } = this.props;
    loadUser();
    loadUsers();
  }

  render() {
    const AuthProject = AuthRoute(MainProjectPage);
    const { loggedIn } = this.props;
    const checkDashNav = loggedIn && !this.state.dashNavOpen ? ' dash-nav-move' : '';
    return (
      <Router>
        <div>
          <Nav grabNavStatus={this.grabNavStatus} />
          <div className={`main-container${checkDashNav}`}>
            <Route exact path='/' render={({ history }) => <Home history={ history } />} />
            <Route exact path='/:userId/projects/:projectId' render={({ match, location }) => (
              <AuthProject userId={match.params.userId * 1} projectId={match.params.projectId * 1} location={location}/>
            )} />
          </div>
        </div>
      </Router>
    ); 
  }
}

const mapState = ({ user }) => ({ loggedIn: !!user.id });

const mapDispatch = dispatch => {
  return {
    loadUser: () => {
      const token = window.localStorage.getItem('token');
      if(token) {
        dispatch(getUserFromToken(token));
      }
    },
    loadUsers: () => dispatch(fetchUsersFromServer()),
    loadProjects: (userId) => {
      if(userId) {
        dispatch(fetchProjectsFromServer(userId));
      }
    }
  }
}

export default connect(mapState, mapDispatch)(App);