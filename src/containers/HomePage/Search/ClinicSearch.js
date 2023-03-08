import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Style/SearchHome.scss';

class ClinicSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinicSearching: this.props.Clinics,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { Clinics } = this.props;
        if (prevProps.Clinics !== Clinics) {
            this.setState({
                listClinicSearching: Clinics,
            });
        }
    }
    render() {
        const { listClinicSearching } = this.state;
        return (
            <>
                {!!listClinicSearching.length && <h5 className="header-menu-search">Cơ sở y tế</h5>}
                {listClinicSearching.map((Clinic, index) => {
                    return (
                        <div key={index} className="item-clinic">
                            <div>
                                <img src={Clinic.image} alt="" />
                                <span>{(Clinic && Clinic.name) || ' '}</span>
                            </div>
                        </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSearch);
