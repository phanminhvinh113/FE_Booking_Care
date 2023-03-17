import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';
import ImageUserNoneAvatar from '../../../assets/images/Chat/guest.png';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import { path } from '../../../utils';

class AavatarUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        };
        this.wrapperRef = React.createRef();
        this.Avatar = React.createRef();
        this.handleClickOutSide = this.handleClickOutSide.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutSide);
    }
    componentDidUpdate() {}

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutSide);
    }
    //
    handleShowContent = () => {
        this.setState({
            isShow: !this.state.isShow,
        });
    };
    //
    handleClickOutSide = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && !this.Avatar.current.contains(event.target)) {
            this.setState({
                isShow: false,
            });
        }
    };
    //
    handleLoggout = async () => {
        const data = { email: _.get(this.props.userInfo, 'email', 'null'), id: _.get(this.props.userInfo, 'id', 'null') };
        await this.props.processLogout(data);
        window.location.reload();
    };
    render() {
        return (
            <Wrapper>
                <AvatarUser
                    ref={this.Avatar}
                    onClick={this.handleShowContent}
                    src={_.get(this.props.userInfo, 'image', 'false') || ImageUserNoneAvatar}
                />
                <WrapperContent ref={this.wrapperRef} display={this.state.isShow ? 'block' : 'none'}>
                    <div className="container">
                        <HeaderMenu>
                            <img src={_.get(this.props.userInfo, 'image', 'false') || ImageUserNoneAvatar} />
                            <span>{_.get(this.props.userInfo, 'firstName', 'Guest')}</span>
                        </HeaderMenu>
                        <MenuUser>
                            <div className="item">Trang cá nhân</div>
                        </MenuUser>
                        <Logout onClick={this.handleLoggout}>Log Out</Logout>
                    </div>
                </WrapperContent>
            </Wrapper>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogout: (data) => dispatch(actions.processLogout(data)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AavatarUser));
// KEY FRAME
const Scale = keyframes`
  from {
    transform:scale(0);
  }
  to{
   transform: scale(1);
  }
`;
// STYLE

const Wrapper = styled.div`
    position: relative;
    margin-left: 5px;
`;
const AvatarUser = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50%;
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;
const WrapperContent = styled.div`
    z-index: 1000;
    display: ${(props) => props.display};
    position: absolute;
    top: 40px;
    right: 25px;
    min-width: 230px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.2);
    color: #1d2129;
    transition: all 0.3s ease-in-out;
    animation: ${Scale} 0.3s linear;
    .container {
        padding: 8px 24px;
    }
`;
const HeaderMenu = styled.header`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    img {
        border-radius: 50%;
        height: 50px;
        object-fit: cover;
        width: 50px;
        margin: 10px 0;
    }
    span {
        margin-left: 12px;
    }
`;
const MenuUser = styled.div`
    .item {
        color: #666;
        cursor: pointer;
        display: block;
        font-size: 1.5rem;
        padding: 15px 0;
        border-bottom: 1px solid #f2f2f2;
        :hover {
            color: #333;
        }
    }
`;
const Logout = styled.div`
    color: #666;
    cursor: pointer;
    display: block;
    font-size: 1.45rem;
    padding: 15px 0;
    &:hover {
        color: #333;
    }
`;
