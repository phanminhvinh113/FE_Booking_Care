import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import _ from 'lodash';
import { ROLE_USER } from '../../utils/constant';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    componentDidMount() {
        const { userInfo } = this.props;
        if (userInfo && userInfo.roleId) {
            if (userInfo.roleId === ROLE_USER.ADMIN) {
                this.setState({
                    menuApp: adminMenu,
                });
            } else if (userInfo.roleId === ROLE_USER.DOCTOR) {
                this.setState({
                    menuApp: doctorMenu,
                });
            }
        }
    }
    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div style={{ margin: 'auto' }}>
                    {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    <span> </span>
                    {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
