import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import _ from 'lodash';
import GuestAvatar from '../../../assets/images/Chat/guest.png';
import CustomScrollbar from '../../../components/CustomScrollbars';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class ChatGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listConversation: this.props.listConversation || [],
            lisUserActive: [],
            countMessageWait: 0,
            activeUser: _.get(this.props.patientInfo, 'User.id', 'null'),
        };
    }

    async componentDidMount() {
        if (this.props.doctorInfo?.id) {
            await this.props.getListConversationPatient(this.props.doctorInfo?.id);
            this.setState({
                listConversation: this.props.listConversation,
            });
        }
        //
        this.props.socket.on('get-user-active', (users) => {
            this.setState({
                lisUserActive: users,
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.patientInfo !== this.props.patientInfo) {
            this.setState({
                activeUser: _.get(this.props.patientInfo, 'User.id', 'null'),
            });
        }
        if (prevProps.doctorInfo !== this.props.doctorInfo) {
            this.setState({
                listConversation: this.props.listConversation,
            });
        }
        if (this.props.userTop && prevProps.userTop !== this.props.userTop) {
            this.setState({
                listConversation: this.props.listConversation,
            });
        }
    }
    //
    handleSelectConversationPatient = async (patientInfo) => {
        await this.props.selectConversation(patientInfo);
    };
    //
    render() {
        return (
            <Wrapper>
                <CustomScrollbar style={{ width: '100%', height: '100%' }}>
                    <ListConversation>
                        {this.state.listConversation &&
                            this.state.listConversation.map((item, index) => {
                                return (
                                    <ItemConversaiton
                                        active={this.state.activeUser === item.senderId ? true : false}
                                        key={index}
                                        onClick={async () => this.handleSelectConversationPatient(item)}
                                    >
                                        <Image background={_.get(item.User, 'image', 'null')}></Image>
                                        <Name>{_.get(item.User, 'firstName', '')}</Name>
                                    </ItemConversaiton>
                                );
                            })}
                    </ListConversation>
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
        patientInfo: state.user.patientInfo,
        listConversation: state.user.listConversation,
        userTop: state.user.userTop,
    };
};
//
const mapDispatchToProps = (dispatch) => {
    return {
        selectConversation: (patientInfo) => dispatch(actions.selectConversationPatient(patientInfo)),
        getListConversationPatient: (doctorId) => dispatch(actions.getListConversationPatient(doctorId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatGroup));
//
const Wrapper = styled.div`
    height: 100vh;
    width: 200px;
    background-color: #ccc;
`;
const ListConversation = styled.div``;
const ItemConversaiton = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 8px 5px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? '#e5e5e5' : 'transparent')};
    &:hover {
        background-color: #e5e5e5;
        border-radius: 5px;
    }
    margin-top: 2px;
`;
const Image = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: url(${(props) => (props.background ? props.background : GuestAvatar)}) no-repeat center;
    background-size: cover;
`;
const Name = styled.p`
    font-size: 1.8rem;
    margin-left: 10px;
    font-weight: 500;
`;
