import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import './Style/SearchHome.scss';

class DoctorSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctorSearching: this.props.Doctors,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { Doctors } = this.props;
        if (prevProps.Doctors !== Doctors) {
            this.setState({
                listDoctorSearching: Doctors,
            });
        }
    }
    //
    //
    handleViewDotor = async (doctorId) => {
        this.props.history.push(`/detail-doctor/${doctorId}`);
        await this.props.getPositionDoctorPage(0);
    };
    render() {
        const { listDoctorSearching } = this.state;
        return (
            <>
                {!!listDoctorSearching.length && <h5 className="header-menu-search">Bác sĩ</h5>}
                {listDoctorSearching.map((Doctor, index) => {
                    const image = Doctor.image ? Doctor.image : Doctor.User.image;
                    const name = Doctor.DoctorInfo ? Doctor.DoctorInfo.name : Doctor.name;
                    const specs = Doctor.DoctorInfo ? Doctor.DoctorInfo.specs.valueVI : Doctor.specs.valueVI;
                    const doctorId = Doctor.id ? Doctor.id : Doctor.doctorId;
                    return (
                        <a onClick={() => this.handleViewDotor(doctorId)} key={index} className="item-doctor">
                            <img src={image} alt="" />
                            <div className="more">
                                <span>{!!name && name}</span>
                                <h6>{!!specs && specs}</h6>
                            </div>
                        </a>
                    );
                })}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPositionDoctorPage: (scrollY) => dispatch(actions.getPostionScrollDoctorPage(scrollY)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSearch));
