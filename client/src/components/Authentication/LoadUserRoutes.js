// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';

// // import { fetchUsersFromServer } from '../../store';

// import Dashboard from '../Dashboard/Dashboard';
// import AllProjects from '../Projects/AllProjects';

// class LoadUserRoutes extends Component {
//   componentDidMount() {
//     // const { loadUsers } = this.props;
//     // loadUsers();
//   }

//   render() {
//     return (
//       <div className='user-routes-container'>
//         <Route exact path='/:id/dashboard' render={({ match }) => <Dashboard id={match.params.id} />} />
//         <Route exact path='/:id/projects' render={() => <AllProjects />} />
//       </div>
//     );
//   }
// }

// const mapState = null;

// const mapDispatch = dispatch => {
//   return {
//     // loadUsers: () => dispatch(fetchUsersFromServer())
//   }
// }

// export default connect(mapState, mapDispatch)(LoadUserRoutes);