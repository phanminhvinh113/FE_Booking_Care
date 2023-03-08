import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomScrollbar from '../../../components/CustomScrollbars';

class ChatGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        return (
            <Wrapper>
                <CustomScrollbar style={{ width: '100%', height: '100%' }}>
                    <div>
                        <h1>chat</h1>
                        <h2>123123</h2>
                    </div>
                </CustomScrollbar>
            </Wrapper>
        );
    }
}
//
ChatGroup.propTypes = {};
//
const mapStateToProps = (state) => {
    return {
        doctorInfo: state.user.userInfo,
    };
};
//
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatGroup));
//
const Wrapper = styled.div`
    height: 100vh;
    width: 200px;
    background-color: #ccc;
    h1 {
        height: 300px;
    }
    h2 {
        height: 5000px;
    }
`;
