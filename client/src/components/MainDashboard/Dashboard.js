import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProjectsFromServer } from '../../store';

class Dashboard extends Component {
  componentDidMount() {
    const { loadProjects, user } = this.props;
    loadProjects(user.id);
  }

  render() {
    const { user } = this.props;
    return (
      <div className='dashboard-container'>
        <h2>Welcome, {user.email}!</h2>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => {
  return {
    loadProjects: (userId) => dispatch(fetchProjectsFromServer(userId))
  }
}

export default connect(mapState, mapDispatch)(Dashboard);