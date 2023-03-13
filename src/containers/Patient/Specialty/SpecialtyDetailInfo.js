import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { PulseLoader } from 'react-spinners';
import { getDoctorBelongSpecialtyByProvince, getSpecialtyById } from '../../../services/adminService';
import HeaderDefaultSection from '../HeaderDefaultSection';
import DesciptionSpecialty from './DesciptionSpecialty';
import IntroduceDoctor from '../Doctor/IntroduceDoctor';
import MedicalExaminaltionScheduleBySpecialty from '../Doctor/MedicalExaminationSchduleBySpecialty';
import InfoAttached from '../Doctor/InfoAttached';
import Footer from '../../HomePage/Footer';
import './Style/SpecialtyDetailInfo.scss';

/////
class SpecialtyDetailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProvince: { label: 'Tất cả', value: 'ALL', type: 'PROVINCE' },
            specialltyId: this.props.match.params.id,
            showMore: false,
            specialtlyInfo: {},
            listProvice: [],
            listDoctor: [],
            image: '',
            isLoading: true,
        };
        this.promises = [
            getSpecialtyById(this.props.match?.params.id),
            getDoctorBelongSpecialtyByProvince(this.state.selectedProvince?.value, this.props.match?.params.id),
            this.props.fetchProvinceData('PROVINCE'),
        ];
    }
    //// DID MOUNT ////
    async componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            const [{ data: res1 }, { data: res2 }, res3] = await Promise.all(this.promises);
            if (res1 && res1.errCode === 0 && res2 && res2.errCode === 0) {
                this.setState({
                    specialtlyInfo: res1.data,
                    image: res1.data?.image ? Buffer.from(res1.data.image, 'base64').toString('binary') : null,
                    listDoctor: res2.data,
                    schedule: res2.scheduleDoctor,
                    isLoading: false,
                });
            }
            //TITLE
            document.title = res1.data?.name || 'Booking Care';
        }
        // SCROLL
        document.body.scrollTop = this.props.postionSpecialtyPage;
    }
    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listProvice !== this.props.listProvice) {
            this.setState({
                listProvice: [
                    { label: 'Tất cả', value: 'ALL', type: 'PROVINCE' },
                    ...this.setUpOptionFill(this.props.listProvice),
                ],
            });
        }
        if (prevProps.postionSpecialtyPage !== this.props.postionSpecialtyPage) {
            document.body.scrollTop = this.props.postionSpecialtyPage;
        }
    }
    //
    componentWillUnmount() {
        this.props.getPostionScrollSpecialtyPage(document.body.scrollTop);
    }
    //
    handleScrollPage = () => {
        console.log(document.body.scrollTop);
    };
    ///
    setUpOptionFill = (data) => {
        return data.map((item) => ({
            label: item.valueVI,
            value: item.keyMap,
            type: item.type,
        }));
    };
    //
    handleChangeSelectSpeacialtyByProvice = async (selectedProvince) => {
        const { data: response } = await getDoctorBelongSpecialtyByProvince(selectedProvince.value, this.state.specialltyId);
        if (response && response.errCode === 0) {
            this.setState({
                listDoctor: response.data,
                schedule: response.scheduleDoctor,
                selectedProvince,
            });
        } else {
            this.setState({ selectedProvince });
        }
    };
    // find schedule doctor
    handleFindScheduleDoctor = (scheduleDoctor, doctorId) => {
        scheduleDoctor = scheduleDoctor.find((item) => item.doctorId === doctorId);
        return scheduleDoctor.schedule;
    };

    //// RENDER ///
    render() {
        const { specialtlyInfo, image, showMore, listProvice, selectedProvince, listDoctor, isLoading, schedule } = this.state;
        //                  \\||                      //
        return (
            <>
                {specialtlyInfo && (
                    <div className="detail-info-specialty-by-id" onScroll={this.handleScrollPage}>
                        <header>
                            <HeaderDefaultSection nameTitle={specialtlyInfo.name} spec />
                        </header>
                        <div className="body-detail-specialty">
                            <div
                                className={showMore ? 'desciption show-more' : 'desciption hidden'}
                                style={{ backgroundImage: `url(${image}) ` }}
                            >
                                <div className="background">
                                    <DesciptionSpecialty description={specialtlyInfo} />
                                </div>
                            </div>
                            <div
                                className="btn-show container"
                                onClick={() =>
                                    this.setState({
                                        showMore: !this.state.showMore,
                                    })
                                }
                            >
                                {showMore ? 'Ẩn bớt.' : 'Chi tiết...'}
                            </div>
                        </div>
                        <div className="doctor-by-specialty">
                            <div className="fiter-by-provice container">
                                <Select
                                    className="col-2"
                                    defaultValue={selectedProvince}
                                    options={!!listProvice.length && listProvice}
                                    onChange={this.handleChangeSelectSpeacialtyByProvice}
                                />
                            </div>
                            <div>
                                <div className="loading-specialty">
                                    <PulseLoader loading={isLoading} color="#45C3D2" size={25} speedMultiplier={1} />
                                </div>
                                {!!listDoctor.length &&
                                    !isLoading &&
                                    listDoctor.map((doctor, index) => {
                                        return (
                                            <div key={index} className="doctor-belong-specialty container mt-4">
                                                <div className="description-doctor">
                                                    <IntroduceDoctor
                                                        doctorId={doctor.doctorId}
                                                        inforDoctor={doctor.User}
                                                        specialty={true}
                                                    />
                                                </div>
                                                <div className="schedule-medical">
                                                    <MedicalExaminaltionScheduleBySpecialty
                                                        doctorId={doctor.doctorId}
                                                        inforDoctor={doctor.User}
                                                        schedule={this.handleFindScheduleDoctor(schedule, doctor.doctorId)}
                                                    />
                                                    <InfoAttached doctorId={doctor.doctorId} inforDoctor={doctor.User} />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div>
                                {!listDoctor.length && !isLoading && (
                                    <span className="title">
                                        <h1>Không có bác sĩ nào!</h1>
                                    </span>
                                )}
                            </div>
                            <div style={{ height: '50px' }}></div>
                        </div>
                        <Footer />
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listProvice: state.admin.data,
        postionSpecialtyPage: state.app.postionSpecialtyPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProvinceData: (type) => dispatch(actions.fetchApiStart(type)),
        getPostionScrollSpecialtyPage: (prevY) => dispatch(actions.getPostionScrollSpecialtyPage(prevY)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetailInfo);
