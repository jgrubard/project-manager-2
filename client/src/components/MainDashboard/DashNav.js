import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllProjects from '../Projects/AllProjects';

class DashNav extends Component {
  constructor() {
    super();
    this.state = {}
  }
  
  render() {
    return (
      <div className={`dash-nav`}>
        <br />
        <br />
        <div className='dash-nav-item'>
          Dash Nav
        </div>
        <AllProjects />
      </div>
    );
  }
}

const mapState = ({ projects }) => ({ projects });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DashNav);