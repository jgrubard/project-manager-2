import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import ProjectForm from './ProjectForm';
import EditProject from './EditProject';

class AllProjects extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      project: ''
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(project) {
    const  { isEditing } = this.state;
    project ? project : '';
    this.setState({ isEditing: !isEditing, project });
  }

  render() {
    const { projects, project } = this.props;
    const { isEditing } = this.state;
    const { toggleModal } = this;
    // if(!project) return null;
    return (
      <div>
      <div>
        <h2>All Projects</h2>
        {
          isEditing &&
            <EditProject toggleModal={toggleModal} project={project}/>
        }
        <ProjectForm />
        {
          projects.map((p, i) => {
            const color = i % 2 === 0 ? 'row-color-white' : 'row-color-none';
            return (
              <div key={p.id} className={color}>
                <Link to={`/${this.props.userId}/projects/${p.id}`}>
                  <span className='project-name-margin'>
                    {p.name}
                  </span>
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

export default withRouter(connect(mapState, mapDispatch)(AllProjects));