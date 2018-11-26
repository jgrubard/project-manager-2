// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import AllProjects from '../Projects/AllProjects';
// import MainProjectPage from '../Projects/MainProjectPage';

// import { fetchProjectsFromServer } from '../../store';

// class Dashboard extends Component {
//   constructor() {
//     super();
//     this.state = {
//       pageLoad: 'projects',
//       project: {},
//       showDash: true
//     }
//     this.loadProject = this.loadProject.bind(this);
//     this.toggleDashboard = this.toggleDashboard.bind(this);
//   }

//   componentDidMount() {
//     const { loadProjects, userId } = this.props;
//     loadProjects(userId);
//   }

//   loadProject(project) {
//     this.setState({ project, pageLoad: 'project-page' });
//   }

//   toggleDashboard() {
//     this.setState({ showDash: !this.state.showDash })
//   }

//   render() {
//     const { pageLoad, project, showDash } = this.state;
//     const { loadProject, toggleDashboard } = this;
//     return (
//       <div className='dashboard-container'>
//         {
//           showDash &&
//             <div>
//               <h2>Dashboard</h2>
//               <div className='dash-nav-container'>
//                 <div>
//                   <div
//                     className='dash-nav-item'
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => this.setState({ pageLoad: 'projects', project: {} })}
//                   >
//                     Projects
//                   </div>
//                   <div className='dash-nav-item project-name'>
//                     { project.name ? project.name : 'No Project Selected' }
//                   </div>
//                 </div>
//               </div>
//             </div>
//         }
//         {
//           pageLoad === 'projects' &&
//             <AllProjects loadProject={loadProject}/>
//         }
//         {
//           pageLoad === 'project-page' &&
//             <MainProjectPage project={project} toggleDashboard={toggleDashboard} showDash={showDash} />
//         }
//       </div>
//     );
//   }
// }

// const mapState = ({ user }) => ({ userId: user.id });

// const mapDispatch = dispatch => {
//   return {
//     loadProjects: (userId) => dispatch(fetchProjectsFromServer(userId))
//   }
// }

// export default connect(mapState, mapDispatch)(Dashboard);


// /* 

// import React, { Component } from 'react';

// import AllProjects from '../Projects/AllProjects';

// class DashNav extends Component {
//   constructor() {
//     super();
//     this.state = {
//       pageLoad: 'projects'
//     }
//   }
  
//   render() {
//     let projectName;
//     const { pageLoad } = this.state;
//     return (
//       <div>
//         <div className='dash-nav-item'>
//           Projects
//         </div>
//         <div className='dash-nav-item'>
//           Tab 2
//         </div>
//         <div className='dash-nav-item'>
//           Tab 3
//         </div>
//         <div className='dash-nav-item project-name'>
//           { !!projectName ? projectName : 'No Project Selected' }
//         </div>
//         {
//           pageLoad === 'projects' &&
//             <AllProjects />
//         }
//       </div>
//     );
//   }
// }

// export default DashNav;

// */