import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Style/InfoAttached.scss';
import { NumericFormat } from 'react-number-format';
/////
class InfoAttached extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDetailPrice: false,
            viewDetailInsurance: false,
            inforDoctor: this.props.inforDoctor,
            price: ' ',
            payment: ' ',
            nameClinic: ' ',
            addressClinic: ' ',
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {
        if (this.props.inforDoctor.DoctorInfo) {
            const { price, payment, nameClinic, addressClinic } = this.props.inforDoctor.DoctorInfo;
            this.setState({
                price,
                payment,
                nameClinic,
                addressClinic,
            });
        }
    }

    ///// DID UPDATE /////
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.inforDoctor !== this.props.inforDoctor) {
            const { price, payment, nameClinic, addressClinic } = this.props.inforDoctor.DoctorInfo;
            this.setState({
                inforDoctor: this.props.inforDoctor,
                price,
                payment,
                nameClinic,
                addressClinic,
            });
        }
    }
    /// HADNLE VIEW TABLE PRICE ////
    handleViewDetailPrice = () => {
        this.setState({
            viewDetailPrice: !this.state.viewDetailPrice,
        });
    };
    /////
    handleViewDetailInsurance = () => {
        this.setState({
            viewDetailInsurance: !this.state.viewDetailInsurance,
        });
    };
    //// RENDER ///
    render() {
        const { price, payment, nameClinic, addressClinic } = this.state;
        return (
            <div className="info-attched-doctor-id">
                <div className="location-medical">
                    <h3>ĐỊA CHỈ KHÁM</h3>
                    <div className="hosital">{nameClinic || ' '}</div>
                    <div className="address"> {addressClinic || ' '}</div>
                </div>
                <div className="price">
                    <h3>GIÁ KHÁM:</h3>

                    {!this.state.viewDetailPrice && (
                        <>
                            <span>
                                <NumericFormat
                                    value={price.valueVI || ' '}
                                    thousandSeparator=","
                                    displayType="text"
                                    suffix={'VND'}
                                />
                            </span>
                            <span className="detail" onClick={this.handleViewDetailPrice}>
                                Xem chi tiêt
                            </span>
                        </>
                    )}
                </div>
                {!!this.state.viewDetailPrice && (
                    <>
                        <table className="table-view">
                            <thead>
                                <tr className="view-detail-price"></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Giá khám
                                        <small>
                                            Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là{' '}
                                            {price.valueEN || ' '} USD
                                        </small>
                                    </td>
                                    <td className="prioritize">
                                        <NumericFormat
                                            value={price.valueVI || ' '}
                                            thousandSeparator=","
                                            displayType="text"
                                            suffix="VND"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="lichkham-gia-ghichu">
                                    <td colSpan="2">
                                        <small>
                                            {payment.valueVI &&
                                                payment.valueVI === 'Tất cả' &&
                                                'Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ'}
                                            {payment.valueVI &&
                                                payment.valueVI !== 'Tất cả' &&
                                                `Người bệnh có thể thanh toán chi phí bằng hình thức ${payment.valueVI}`}
                                        </small>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        {this.state.viewDetailPrice && (
                            <div
                                style={{ color: '#3384c5', marginTop: '5px', cursor: 'pointer' }}
                                onClick={this.handleViewDetailPrice}
                            >
                                {' '}
                                Ẩn bản giá
                            </div>
                        )}
                    </>
                )}

                <div className="insurance-apply">
                    <h3>LOẠI BẢO HIỂM ÁP DỤNG.</h3>
                    {!this.state.viewDetailInsurance && (
                        <span className="detail" onClick={this.handleViewDetailInsurance}>
                            Xem chi tiêt
                        </span>
                    )}
                </div>
                <div>
                    {!!this.state.viewDetailInsurance && (
                        <>
                            <table className="table-view">
                                <thead>
                                    <tr className="view-detail-price"></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            Bảo hiểm Y tế nhà nước
                                            <small>Không áp dụng</small>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">
                                            Bảo hiểm bảo lãnh trực tiếp
                                            <small>
                                                Phòng khám hiện không áp dụng bảo hiểm bảo lạnh trực tiếp và chưa có xuất hóa đơn
                                                tài chính (hóa đơn đỏ)
                                            </small>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div
                                style={{ color: '#3384c5', marginTop: '5px', cursor: 'pointer' }}
                                onClick={this.handleViewDetailInsurance}
                            >
                                Thu gọn
                            </div>
                        </>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoAttached);
