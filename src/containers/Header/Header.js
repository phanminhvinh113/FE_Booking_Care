import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import _ from 'lodash';
import { ROLE_USER, path } from '../../utils/constant';
import { Link } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    componentDidMount() {
        const { userInfo } = this.props;
        if (userInfo && userInfo?.roleId === ROLE_USER.ADMIN) {
            this.setState({
                menuApp: adminMenu,
            });
        }
        if (userInfo && userInfo?.roleId === ROLE_USER.DOCTOR) {
            this.setState({
                menuApp: doctorMenu,
            });
        }
    }
    handleLogout = () => {
        if (this.props.userInfo) {
            const { email, id } = this.props.userInfo;
            this.props.processLogout({ email, id });
        }
    };
    render() {
        const { userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="name-user" style={{ margin: 'auto' }}>
                    {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                    <span> </span>
                    {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                </div>
                {/* nút logout */}
                <Link to={path.LOGIN} className="btn btn-logout" onClick={this.handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: (user) => dispatch(actions.processLogout(user)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
