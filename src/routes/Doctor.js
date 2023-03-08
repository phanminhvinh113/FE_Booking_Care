import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ManageConversationDoctor from '../containers/Doctor/Convnersation/ManageConversationDoctor';
import ManagePatientBooking from '../containers/Doctor/ManagePatientBooking';
import PersonalityDoctor from '../containers/Doctor/PersonalityDoctor';
import ScheduleDoctor from '../containers/Doctor/ScheduleDoctorManage';
import Header from '../containers/Header/Header';

class Doctor extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <Header />}
                <div className="system-list">
                    <Switch>
                        <Route path="/doctor/manage/schedule" component={ScheduleDoctor} />
                        <Route path="/doctor/manage/personality" component={PersonalityDoctor} />
                        <Route path="/doctor/manage/patient" component={ManagePatientBooking} />
                        <Route path="/doctor/conversation" component={ManageConversationDoctor} />

                        <Route
                            component={() => {
                                return <Redirect to="/doctor/manage/schedule" />;
                            }}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
