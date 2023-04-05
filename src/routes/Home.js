import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROLE_USER, path } from '../utils';

class Home extends Component {
    render() {
        let linkToRedirect = path.LOGIN;
        //
        const { isLoggedIn, userInfo } = this.props;
        //
        if (isLoggedIn && userInfo?.roleId === ROLE_USER.ADMIN) linkToRedirect = path.SYSTEM;
        if (isLoggedIn && userInfo?.roleId === ROLE_USER.DOCTOR) linkToRedirect = path.DOCTOR;
        if (isLoggedIn && userInfo?.roleId === ROLE_USER.PATIENT) linkToRedirect = path.HOMEPAGE;
        //
        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
