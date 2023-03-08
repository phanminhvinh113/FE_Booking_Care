import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Style/DoctorRemote.scss';
class DoctorRemote extends Component {
    render() {
        return (
            <div className="home-doctor-remote-container">
                <h1>Doctor Remote</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRemote);
