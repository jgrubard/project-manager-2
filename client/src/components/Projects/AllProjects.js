import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProjectForm from './ProjectForm';

class AllProjects extends Component {
  constructor() {
    super();
  }

  render() {
    const { projects, userId } = this.props;
    return (
      <div>
      <div>
        <h2>All Projects</h2>
        <ProjectForm />
        {
          projects.map((p, i) => {
            const color = i % 2 === 0 ? 'row-color-white' : 'row-color-none';
            return (
              <div key={p.id} className={color}>
                <Link to={`/${userId}/projects/${p.id}`} className='project-name'>
                  {/* <span className='project-name-container'> */}
                    {p.name}
                  {/* </span> */}
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
    );
  }
}

const mapState = ({ projects, user }) => {
  const userId = user.id;
  return { projects, userId }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllProjects);