import React, { Component } from 'react';
import './Style/Download.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class Download extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 700,
            slidesToShow: 2,
            slidesToScroll: 2,
        };
        return (
            <div className="section_download_home_page">
                <div className="content_download">
                    <h2 className="title_download">Tải ứng dụng BookingCare</h2>
                    <div className="benefit_app">
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Đặt lịch khám nhanh hơn</span>
                    </div>
                    <div className="benefit_app">
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Nhận thông báo từ hệ thống</span>
                    </div>
                    <div className="benefit_app">
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Nhận hướng dẫn đi khám chi tiết</span>
                    </div>
                    <div className="store-download">
                        <a href="https://bookingcare.vn/app/android" className="google-play">
                            <img
                                alt="Tải ứng dụng BookingCare trên Android"
                                width="135"
                                height="40"
                                src="https://bookingcare.vn/assets/icon/google-play-badge.svg"
                            />
                        </a>
                        <a href="https://bookingcare.vn/app/ios" className="app-store">
                            <img
                                alt="Tải ứng dụng BookingCare trên iOS"
                                width="120"
                                height="40"
                                src="https://bookingcare.vn/assets/icon/app-store-badge-black.svg"
                            />
                        </a>
                    </div>
                    <a href="https://bookingcare.vn/app" className="link_auto_download">
                        Hoặc mở liên kết:
                        <strong> https://bookingcare.vn/app</strong>
                    </a>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Download);
