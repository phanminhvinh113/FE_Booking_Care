import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import Footer from '../../HomePage/Footer';
import HeaderHome from '../../HomePage/HeaderHome';
import './Style/ReviewDoctor.scss';
import { evaluateMedicalDoctor } from '../../../services/userService';

/////
class ReviewDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            comment: '',
            date: moment(new Date()).format('DD/MM/YYYY'),
        };
        this.stars = [1, 2, 3, 4, 5];
    }
    //// DID MOUNT ////
    async componentDidMount() {
        const { location, match, history } = this.props;

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const patientId = urlParams.get('patientId');
        const doctorId = urlParams.get('doctorId');
        if (token && patientId) {
            this.setState(
                {
                    token,
                    patientId,
                    doctorId,
                },
                () => {
                    console.log(this.state);
                },
            );
        }
    }
    //
    handleClickStar = (star) => {
        this.setState({
            rate: star,
        });
    };
    //
    handleOnChangeText = (e) => {
        this.setState({
            comment: e.target.value,
        });
    };
    //
    handleSendEvaluate = async () => {
        const { data: response } = await evaluateMedicalDoctor(this.state);
        if (response && response.errCode === 0) {
            toast.success(response.message);
        } else if (response.errCode !== 0) {
            toast.warn(response.message);
        }
    };
    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {}

    //// RENDER ///
    render() {
        return (
            <Fragment>
                <HeaderHome />
                <div className="review-medical-service-doctor">
                    <div className="container mb-5">
                        <div className="title">NHẬN XÉT DỊCH VỤ CỦA BÁC SĨ</div>
                        <div className="evaluate">
                            <span className="mx-4">Đánh giá:</span>
                            <div className="evaluate-star">
                                {this.stars.map((value) => (
                                    <span
                                        key={value}
                                        className={`evaluate-star-item ${value <= this.state.rate ? 'active' : 'hidden'}`}
                                        onClick={() => this.handleClickStar(value)}
                                    >
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="write-comment mt-4">
                            <div className="mb-4">Nhận xét về bác sĩ:</div>
                            <textarea
                                className="write-comment-text"
                                value={this.state.comment}
                                onChange={(event) => this.handleOnChangeText(event)}
                                placeholder="Ghi nhận xét của bạn vào đây!"
                            />
                            <button className="write-comment-submit" onClick={this.handleSendEvaluate}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDoctor);
