import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import _ from 'lodash';
import GuestAvatar from '../../../assets/images/Chat/guest.png';
import CustomScrollbar from '../../../components/CustomScrollbars';
import { getAllConversationDoctorService } from '../../../services/userService';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class ChatGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listConversation: [],
        };
    }

    async componentDidMount() {
        if (this.props.doctorInfo?.id) {
            const { data: res } = await getAllConversationDoctorService(this.props.doctorInfo.id);
            if (res && res.errCode === 0) {
                this.setState(
                    {
                        listConversation: res.data,
                    },
                    () => console.log(this.state.listConversation),
                );
            } else {
                toast.error('Falied to Load List Question');
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}
    //
    handleSelectConversationPatient = async (patientInfo) => {
        console.log(patientInfo);
        await this.props.selectConversation(patientInfo);
    };
    //
    render() {
        console.log(this.state.listConversation);
        return (
            <Wrapper>
                <CustomScrollbar style={{ width: '100%', height: '100%' }}>
                    <ListConversation>
                        {this.state.listConversation &&
                            this.state.listConversation.map((item, index) => {
                                return (
                                    <ItemConversaiton key={index} onClick={() => this.handleSelectConversationPatient(item)}>
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
    };
};
//
const mapDispatchToProps = (dispatch) => {
    return {
        selectConversation: (patientInfo) => dispatch(actions.selectConversationPatient(patientInfo)),
    };
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
const ListConversation = styled.div``;
const ItemConversaiton = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 8px 5px;
    cursor: pointer;
    &:hover {
        background-color: #e5e5e5;
        border-radius: 5px;
    }
    margin-top: 2px;
`;
const Image = styled.div`
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background: url(${(props) => (props.background ? props.background : GuestAvatar)}) no-repeat center;
    background-size: cover;
`;
const Name = styled.p`
    font-size: 1.8rem;
    margin-left: 10px;
    font-weight: 500;
`;
