import React, { Component, Fragment } from 'react';
import { Redirect, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllDoctorService, getTopDoctorHomeService } from '../../../services/adminService';
import HeaderNavigate from './HeaderNavigate';
import './Style/DoctorHeader.scss';
import _ from 'lodash';
import { TITLE_BROWSWER } from '../../../utils';
class DoctorHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTopDoctor: [],
            listDoctorSearched: [],
            listAllDocTor: [],
            searchInput: '',
            resultSearch: false,
        };
        this.timerId = null;
        this.promises = [getTopDoctorHomeService(8), getAllDoctorService()];
    }
    async componentDidMount() {
        //TITLE BROWSER
        document.title = TITLE_BROWSWER.doctor_seacrch;
        //FETCH API
        const [{ data: res }, { data: response }] = await Promise.all(this.promises);
        if (res && res.errCode === 0 && response && res.errCode === 0) {
            this.setState({
                listTopDoctor: res.data,
                listAllDocTor: response.doctors,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    componentWillUnmount() {}
    // DELAY TIME OUT
    debounce = async (value, delay) => {
        if (this.timerId) {
            clearTimeout(timerId);
        }
        this.timerId = setTimeout(() => {
            const { listAllDocTor } = this.state;
            if (!value || value.startsWith(' ')) {
                this.setState({
                    listDoctorSearched: [],
                    resultSearch: false,
                });
            } else {
                const listDoctorSearched = listAllDocTor.filter((item) => {
                    const searchValue = item.firstName + item.lastName + item.positionData.valueVI;
                    return !!searchValue.toLowerCase().includes(value.toLowerCase());
                });
                this.setState({
                    listDoctorSearched,
                    resultSearch: true,
                });
            }
            timerId = null;
        }, delay);
    };

    // HANDLE SEARCH DOCTOR //
    handleOnChangeSearchDoctor = async (e) => {
        const searchInput = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
            const { listAllDocTor } = this.state;
            if (!searchInput || searchInput.startsWith(' ')) {
                this.setState({
                    listDoctorSearched: [],
                    resultSearch: false,
                });
            } else {
                const listDoctorSearched = listAllDocTor.filter((item) => {
                    let searchValueName = item.firstName + item.lastName + item.positionData.valueVI;
                    searchValueName = searchValueName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return !!searchValueName.toLowerCase().includes(searchInput.toLowerCase());
                });
                this.setState({
                    listDoctorSearched,
                    resultSearch: true,
                });
            }
        }, 700);
    };
    //

    render() {
        const { listTopDoctor, listDoctorSearched, resultSearch } = this.state;
        return (
            <div className="health-facilities-header-home-page" style={{ marginTop: '100px' }}>
                <HeaderNavigate title={'Bác sĩ'} />
                <div className="search-doctor">
                    <input type={'text'} placeholder="Tìm kiếm bác sĩ" onChange={(e) => this.handleOnChangeSearchDoctor(e)} />
                </div>
                <div className="list-doctor-search">
                    {resultSearch && <h3> Danh sách tìm kiếm</h3>}
                    {listDoctorSearched &&
                        listDoctorSearched.map((doctor, index) => {
                            return (
                                <div key={index} className="doctor-item-search">
                                    <Link to={`/detail-doctor/${doctor.id}`} key={index}>
                                        <img src={doctor.image} />
                                        <span>
                                            {doctor.positionData.valueVI}, {doctor.lastName} {doctor.firstName}
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
                <div className="doctor-outstanding">
                    <h3> Bác sĩ nổi bật tuần qua</h3>
                    {listTopDoctor &&
                        listTopDoctor.map((doctor, index) => {
                            return (
                                <div key={index} className="doctor-item">
                                    <Link to={`/detail-doctor/${doctor.id}`}>
                                        <img src={doctor.image} />
                                        <span>
                                            {doctor.positionData.valueVI}, {doctor.lastName} {doctor.firstName}
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorHeader);
