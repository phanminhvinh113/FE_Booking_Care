import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';
import { faBars, faCircleQuestion, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBarNav from '../HomePage/SideBar/SideBarNav';
import './HeaderDefaultSection.scss';

/////
class HederDoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //// DID MOUNT ////
    async componentDidMount() {}

    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {}

    //// HANDLE BACK ///
    handleOnBack = () => {
        this.props.history.goBack();
    };
    //// RENDER ///
    render() {
        return (
            <div className="header-detail-info-doctor-id">
                <div className="container header-content ">
                    <div className="left">
                        <FontAwesomeIcon icon={faLeftLong} className="icon-back" onClick={this.handleOnBack} />
                        <h2 className="name-doctor">{this.props.nameTitle}</h2>
                    </div>
                    <div className="right">
                        <div className="help">
                            <div>
                                <FontAwesomeIcon icon={faCircleQuestion} className="help-icon" />
                            </div>
                            <span>Hỗ trợ</span>
                        </div>
                        <SideBarNav bgBlue={true} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HederDoctorDetail));
