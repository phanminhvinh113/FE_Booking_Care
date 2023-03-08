import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchHome from './Search/SearchHome';
import './Style/HomeBody.scss';
class HomeBody extends Component {
    render() {
        return (
            <div className="home-body-container">
                <header>
                    <div className="header">
                        <h1>NỀN TẢNG Y TẾ </h1>
                        <span> CHĂM SÓC SỨC KHỎE TOÀN DIỆN</span>
                    </div>
                    <div>
                        <SearchHome />
                    </div>
                </header>
                <footer>
                    <div className="service-app">
                        <div className="wrapper-service">
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png" alt="" />
                                </div>
                                Khám
                                <br />
                                <span>Chuyên Khoa</span>
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png" alt="" />
                                </div>
                                Khám
                                <br />
                                Từ xa
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png" alt="" />
                                </div>
                                Khám
                                <br />
                                Tổng quát
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png" alt="" />
                                </div>
                                Xét nghiệm
                                <br />y học
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png" alt="" />
                                </div>
                                Sức khỏe
                                <br />
                                tinh thần
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png" alt="" />
                                </div>
                                Khám
                                <br />
                                Nha Khoa
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg" alt="" />
                                </div>
                                Gói
                                <br />
                                Phẩu Thuật
                            </div>
                            <div className="content-service">
                                <div>
                                    <img src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png" alt="" />
                                </div>
                                Sản phẩm
                                <br />y tế
                            </div>
                        </div>
                    </div>
                </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
