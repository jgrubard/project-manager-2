import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllProjects from '../Projects/AllProjects';
import UserProfile from '../User/UserProfile';
import { Button } from '../Library';

class DashNav extends Component {
  constructor() {
    super();
    this.state = {
      showProfileModal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { showProfileModal } = this.state;
    this.setState({ showProfileModal: !showProfileModal });
  }
  
  render() {
    const { toggleModal } = this;
    const { showProfileModal } = this.state;
    return (
      <div className={`dash-nav`}>
        {
          showProfileModal &&
            <div className='modal-container modal-project'>
              <UserProfile toggleModal={toggleModal} />
            </div>
        }
        <br />
        <br />
        <Button
          label='Profile Settings'
          active={true}
          onClick={toggleModal}
          long={true}
        />
        <br />
        <br />
        <AllProjects />
      </div>
    );
  }
}

const mapState = ({ projects }) => ({ projects });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DashNav);