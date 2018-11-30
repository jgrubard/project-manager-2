import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import NotAuthorized from './NotAuthorized';

const CheckRoute = (Component) => {

  class AuthComponent extends React.Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.checkAuth();
    }

    checkAuth() {
      const { isAuthorized, history } = this.props;
      if(!isAuthorized) history.push('/');
    }

    render() {
      const { isAuthorized } = this.props;
      return isAuthorized ? <Component { ...this.props }/> : null;
    }
  }

  const mapState = () => {
    const token = window.localStorage.getItem('token');
    const isAuthorized = !!token;
    return { isAuthorized }
  }

  return withRouter(connect(mapState)(AuthComponent));
}

export default CheckRoute;