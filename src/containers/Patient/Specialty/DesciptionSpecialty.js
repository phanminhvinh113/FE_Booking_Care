import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';

import './Style/SpecialtyDetailInfo.scss';
/////
class DesciptionSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {}

    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {}
    ///

    //// RENDER ///
    render() {
        const { description } = this.props;

        return (
            <div className="desciption-specialty-detail-by-id container">
                <header style={{ fontSize: '20px', fontWeight: 'bold', padding: '15px 0' }}>{description.description}</header>
                <div className="content-description " dangerouslySetInnerHTML={{ __html: description.contentHTML }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DesciptionSpecialty);
