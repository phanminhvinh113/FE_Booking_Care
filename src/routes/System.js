import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ScheduleDoctor from '../containers/Doctor/ScheduleDoctorManage';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import Header from '../containers/Header/Header';
import ConfirmModal from '../components/ConfirmModal';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
class System extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <ConfirmModal />
                    {this.props.isLoggedIn && <Header />}
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                        <Route path="/system/manage-doctor-schedule" component={ScheduleDoctor} />
                        <Route path="/system/manage-specialty" component={ManageSpecialty} />
                        <Route path="/system/manage-clinic" component={ManageClinic} />
                        <Route
                            component={() => {
                                return <Redirect to={systemMenuPath} />;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));
