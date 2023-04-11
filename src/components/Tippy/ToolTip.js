import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToolTipFont from '../../assets/font/La-Solid.woff2';
class ToolTip extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
        };
    }
    handleMouseOver = () => {
        this.setState({
            isShow: true,
        });
    };
    handleMouseLeave = () => {
        this.setState({
            isShow: false,
        });
    };
    render() {
        return (
            <ToolTipWrapper translateX={this.props.translateX} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                {this.state.isShow && (
                    <ToolTipContent size={this.props.size} className={this.props.position || 'top'}>
                        {this.props.content || 'No Content!'}
                    </ToolTipContent>
                )}

                {this.props.children && this.props.children}
            </ToolTipWrapper>
        );
    }
}

ToolTip.propTypes = {
    content: PropTypes.string.isRequired,
};

export default ToolTip;

const ToolTipWrapper = styled.div`
    @font-face {
        font-family: 'ToolTip';
        src: url(${ToolTipFont});
    }
    font-family: 'ToolTip';
    position: relative;
    z-index: 1000; // TOP
    .top {
        bottom: 100%;
        left: 50%;
        margin-bottom: 10px;
        ::before {
            top: 100%;
            left: 50%;
            margin-left: -4px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid ${(props) => props.backgroudColor || '#595959'};
        }
    }
    // BOTTOM
    .bottom {
        top: 100%;
        left: 55%;
        margin-top: 10px;
        ::before {
            bottom: 100%;
            left: 50%;
            margin-left: -8px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid ${(props) => props.backgroudColor || '#595959'};
        }
    }
    //LEFT
    .left {
        right: 100%;
        top: 50%;
        transform: translate(0, -50%);
        margin-right: 10px;
        ::before {
            left: 100%;
            top: 50%;
            margin-top: -8px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid ${(props) => props.backgroudColor || '#595959'};
        }
    }
    // RIGHT
    .right {
        left: 100%;
        top: 50%;
        transform: translate(0, -50%);
        margin-left: 10px;
        ::before {
            right: 100%;
            top: 50%;
            margin-top: -8px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid ${(props) => props.backgroudColor || '#595959'};
        }
    }
`;
const ToolTipContent = styled.div`
    z-index: 1000;
    position: absolute;
    font-size: ${(props) => props.size + 'px' || '15px'};
    background-color: ${(props) => props.backgroudColor || '#595959'};
    text-align: center;
    color: ${(props) => props.color || '#fff'};
    transform: translateX(-50%);
    white-space: nowrap;
    border-radius: 4px;
    padding: 6px 10px;
    ::before {
        content: '';
        position: absolute;
    }
`;
/* POSITION TOP */
