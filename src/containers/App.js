import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/GlobalStyle/Globalstyle.scss';
import { userIsAuthenticatedSystem, userIsNotAuthenticated, userIsAuthenticatedDoctor } from '../hoc/authentication';

import { ROLE_USER, path } from '../utils';

import Home from '../routes/Home';
import Register from './Auth/Register';
import Login from './Auth/Login';
import System from '../routes/System';
import Doctor from '../routes/Doctor';

import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage';
import DoctorDetailInfo from './Patient/Doctor/DoctorDetailInfo';
import VerifyBookingDoctor from './Patient/Doctor/VerifyBookingDoctor';
import SpecialtyDetailInfo from './Patient/Specialty/SpecialtyDetailInfo';
import SpecialtyHeader from './HomePage/NavigationHeader/SpecialtyHeader';
import DoctorHeader from './HomePage/NavigationHeader/DoctorHeader';
import HealthFacilitiesHeader from './HomePage/NavigationHeader/HealthFacilitiesHeader';
import ExaminationPackageHeader from './HomePage/NavigationHeader/ExaminationPackageHeader';
import PageNotFound from '../routes/PageNotFound';
import ReviewDoctor from './Patient/Doctor/ReviewDoctor';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };
    async componentDidMount() {
        this.handlePersistorState();
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <ConfirmModal />
                    <div className="content-container">
                        {/* <CustomScrollbar style={{ height: '100vh', width: '100%' }}> */}
                        <Switch>
                            <Route exact path={path.HOME} component={Home} />
                            <Route path={path.REGISTER} component={Register} />
                            {this.props.isLoggedIn && this.props?.userInfo?.roleId === ROLE_USER.ADMIN && (
                                <Route path={path.SYSTEM} component={userIsAuthenticatedSystem(System)} />
                            )}
                            {this.props.isLoggedIn && this.props?.userInfo?.roleId === ROLE_USER.DOCTOR && (
                                <Route path={path.DOCTOR} component={userIsAuthenticatedDoctor(Doctor)} />
                            )}
                            <Route path={path.LOGIN} component={Login} />
                            <Route path={path.HOMEPAGE} component={HomePage} />
                            <Route path={path.DETAILDOCTOR} component={DoctorDetailInfo} />
                            <Route path={path.DETAILSPECIALTY} component={SpecialtyDetailInfo} />
                            <Route path={path.VERIFYBOOKING} component={VerifyBookingDoctor} />
                            <Route path={path.COMFIRM_BOOKING_MEDICAL} component={ReviewDoctor} />
                            <Route path={path.SPECIALTYHEADER} component={SpecialtyHeader} />
                            <Route path={path.DOCTORHEADER} component={DoctorHeader} />
                            <Route path={path.HEALTHFACILITIESHEADER} component={HealthFacilitiesHeader} />
                            <Route path={path.EXAMINATIONPACKAGEHEADER} component={ExaminationPackageHeader} />
                            <Route component={PageNotFound} />
                        </Switch>
                        {/* </CustomScrollbar> */}
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        icon
                    />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        location: state.app.location,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
