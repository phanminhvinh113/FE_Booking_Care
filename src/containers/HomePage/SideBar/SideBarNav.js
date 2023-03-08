import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Style/SideBarNav.scss';
import CustomScrollbars from '../../../components/CustomScrollbars';
class SideBarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    handleOpenSideBar = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    render() {
        return (
            <>
                <div className={this.state.isOpen ? 'sidebar-open' : 'sidebar-closed'} onClick={this.handleOpenSideBar}></div>
                <div className={`sidebar-container`}>
                    <button
                        className={`sidebar-toggle  ${!!this.props.bgBlue ? 'background-blue' : ''}`}
                        onClick={this.handleOpenSideBar}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <aside
                        className={`sidebar ${this.state.isOpen ? 'open' : 'closed'} ${!!this.props.bgBlue ? 'right' : 'left'}`}
                    >
                        <CustomScrollbars style={{ with: '100%', height: '100%' }}>
                            <nav>
                                <ul>
                                    <Link to={'/home'} onClick={this.handleOpenSideBar} className="image">
                                        <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"></img>
                                    </Link>
                                    <Link to={'/home'} onClick={this.handleOpenSideBar}>
                                        Trang Chủ
                                    </Link>
                                    <Link to={'/doctor_header'} onClick={this.handleOpenSideBar}>
                                        Bác sĩ
                                    </Link>
                                    <Link to={'/specialty'} onClick={this.handleOpenSideBar}>
                                        Chuyên Khoa
                                    </Link>
                                    <Link to={'/health_facilities'} onClick={this.handleOpenSideBar}>
                                        Phòng Khám
                                    </Link>
                                    <Link to={'/handbook'} onClick={this.handleOpenSideBar}>
                                        Cẩm Nang
                                    </Link>
                                    <Link to={'/doctor_header'} onClick={this.handleOpenSideBar}>
                                        Liên hệ hợp tác
                                    </Link>
                                </ul>
                            </nav>
                        </CustomScrollbars>
                    </aside>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNav);
