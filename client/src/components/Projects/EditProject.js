import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Button, CloseButton } from '../Library';
import { updateProjectOnServer, deleteProjectFromServer, getAllUsersOnProjectFromServer } from '../../store';

import AddUserToProject from './AddUserToProject';

class EditProject extends Component {
  constructor() {
    super();
    this.state = {
      id: undefined,
      name: '',
      usersToAdd: [],
      usersToRemove: [],
      creatorId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { project: { id }, updateProject, userId, toggleProjectModal } = this.props;
    const { name, usersToAdd, usersToRemove } = this.state;
    const addUserIds = usersToAdd.map(user => user.id);
    // console.log('ON SUBMIT', usersToAdd, usersToRemove); // works here
    const removeUserIds = usersToRemove.map(user => user.id);
    // console.log('ON SUBMIT', addUserIds, removeUserIds); // works here
    updateProject({ id, name }, userId, addUserIds, removeUserIds);
    toggleProjectModal();
  }

  addUser(user) {
    const users = this.state.usersToAdd;
    this.setState({ usersToAdd: [ ...users, user ] });
  }

  removeUser(userId) {
    const { usersToAdd, usersToRemove } = this.state;
    const users = usersToAdd.filter(user => user.id !== userId);
    const user = usersToAdd.find(user => user.id === userId)
    this.setState({
      usersToRemove: [ ...usersToRemove, user ],
      usersToAdd: users
    });
  }

  async componentDidMount() {
    const { project, userId, users, loadProjectUsers } = this.props;
    // const { creatorId } = this.state;
    if(project) {
      const { name, id } = project;
      this.setState({ id, name });
      const userProjects = await loadProjectUsers(id, userId);
      const creatorId = userProjects.find(up => up.role === 'creator').userId;
      const ownUsers = userProjects.reduce((memo, proj) => {
        const user = users.find(user => user.id === proj.userId && userId !== user.id);
        if(user) memo.push(user);
        return memo;
      }, []);
      this.setState({ usersToAdd: ownUsers, creatorId });
    }

  }

  render() {
    const { toggleProjectModal, project, deleteProject, userId } = this.props;
    const { name, usersToAdd, usersToRemove, creatorId } = this.state;
    const { handleChange, onSubmit, addUser, removeUser } = this;
    return (
      <div className='modal-container modal-project'>
        <div className='button-close'>
          <CloseButton
            onClick={toggleProjectModal}
            label='X'
            active={true}
          />
        </div>
        <h2>Edit Project: <i>{project.name}</i></h2>
        <br />
        Change Project Name
        <br />
        <Input
          placeholder='Project Name'
          name='name'
          value={name}
          onChange={handleChange}
        />
        <br />
        <br />
        <AddUserToProject addUser={addUser} />
        {
          usersToAdd.map((user, i) => {
            const color = i % 2 === 0 ? ' user-list-white' : ' user-list-offwhite';
            return (
              <div key={user.id} className={`user-list${color}`}>
                <div className='name-remove-pair'>
                  {
                    user.id === creatorId ? (
                      <span className='creator-color'>Creator</span>
                    ) : (
                      <Button
                        label='remove'
                        onClick={() => removeUser(user.id)}
                        active={true}
                        type={'danger'}
                      />
                    )
                  }

                  <span className='name-space'>{user.email}</span>
                </div>
              </div>
            );
          })
        }
        <br />
        <Button
          onClick={onSubmit}
          label='submit changes'
          active={true}
          long={true}
        />
        {
          userId === creatorId &&
            <Button
              label='Delete Project'
              onClick={() => deleteProject(project.id, userId, toggleProjectModal)}
              active={true}
              long={true}
              type={'danger'}
            />
        }
      </div>
    );
  }
}

const mapState = ({ user, users }) => {
  return {
    userId: user.id,
    users
  }
}

const mapDispatch = dispatch => {
  return {
    updateProject: (project, userId, usersToAdd, usersToRemove) => dispatch(updateProjectOnServer(project, userId, usersToAdd, usersToRemove)),
    deleteProject: async (projectId, userId, toggleProjectModal) => {
      dispatch(deleteProjectFromServer(projectId, userId));
      await toggleProjectModal();
    },
    loadProjectUsers: (projectId, userId) => dispatch(getAllUsersOnProjectFromServer(projectId, userId))
  }
};

export default connect(mapState, mapDispatch)(EditProject);