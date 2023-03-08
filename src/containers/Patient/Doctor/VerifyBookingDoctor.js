import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';
import { postVerifyBookingSchedule } from '../../../services/adminService';
import HeaderHome from '../../HomePage/HeaderHome';

/////
class VerifyBookingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: false,
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {
        const { location, match, history } = this.props;

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const doctorId = urlParams.get('doctorId');
        const { data: res } = await postVerifyBookingSchedule({
            token,
            doctorId,
        });
        if (res && res.errCode === 0) {
            this.setState({
                verify: true,
            });
            toast.success(res.message);
        } else if (res.errCode === 2) {
            toast.error('This schedule verified!');
        }
    }
    //

    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {}

    //// RENDER ///
    render() {
        return (
            <div className="container">
                <HeaderHome />
                <div className="title">
                    {' '}
                    {this.state.verify ? 'XÁC NHẬN KHÁM THÀNH CÔNG ' : 'LỊCH KHÁM NÀY KHÔNG TỒN TẠI HOẶC ĐÃ XÁC NHẬN TRƯỚC ĐÓ'}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBookingDoctor);
