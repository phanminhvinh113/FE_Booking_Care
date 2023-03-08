import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import { postInfoClinic } from '../../../services/adminService';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
////

class ManageSpecialty extends Component {
    ///// /////////////////
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            description: '',
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            image: '',
            urlImage: '',
            isDownloadImage: false,
            isOpenImage: false,
        };
    }
    // DID MOUNT //
    async componentDidMount() {}
    // DID UPDATE
    componentDidUpdate(prevProps, prevState, snapshot) {}
    //
    handleSelectInput = (e) => {
        const copyState = this.state;
        copyState[e.target.name] = e.target.value;
        this.setState({
            ...copyState,
        });
    };
    //
    handleSelectImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await CommonUtils.convertBase64(file);
            this.setState({
                urlImage: URL.createObjectURL(file),
                image: base64,
                isDownloadImage: true,
            });
        }
    };
    //
    handlePreviewImage = () => {
        this.setState({
            isOpenImage: !this.state.isOpenImage,
        });
    };
    //
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        });
    };
    //
    hanldeChangeDescription = (e) => {
        this.setState({
            description: e.target.value,
        });
    };
    //
    handleSaveInfoSpecialty = async () => {
        const { contentMarkdown, contentHtml, name, address, image, description } = this.state;

        const { data: res } = await postInfoClinic({
            description,
            name,
            address,
            image,
            contentMarkdown,
            contentHtml,
        });
        if (res && res.errCode === 0) {
            this.setState({
                description: '',
                contentMarkdown: '',
                contentHtml: '',
                description: '',
                image: '',
                name: '',
                address: '',
                urlImage: '',
                isDownloadImage: false,
                isOpenImage: false,
            });
            toast.success(res.message);
        } else if (res.errCode === 1) {
            toast(res.message);
        }
    };
    /////////// SUBMIT FORM //////////
    ////// RENDER DISPLAY ///////////
    render() {
        return (
            <div className="manage-specialty-system-page">
                <div className="container">
                    <div className="title"> Manage Speacialty</div>
                    <div className="row">
                        <div className="col col-6 mt-4 ">
                            <div>Tên phòng khám</div>
                            <input
                                type="text"
                                onChange={(e) => this.handleSelectInput(e)}
                                name={'name'}
                                value={this.state.name}
                                className="form-control"
                                placeholder="Name Clinic"
                            />
                        </div>
                        <div className="col col-6 mt-4 ">
                            <div>Địa chỉ phòng khám</div>
                            <input
                                type="text"
                                onChange={(e) => this.handleSelectInput(e)}
                                name={'address'}
                                value={this.state.address}
                                className="form-control"
                                placeholder="Address Clinic"
                            />
                        </div>
                        <div className="col col-3 mt-4 ">
                            <div>Chọn ảnh phòng khám</div>
                            <input type="file" onChange={(e) => this.handleSelectImage(e)} className="form-control" />
                        </div>
                        <div className="col col-3 mt-4">
                            {this.state.isDownloadImage && (
                                <>
                                    <div
                                        className="preview-image mt-2"
                                        onClick={this.handlePreviewImage}
                                        style={{
                                            backgroundImage: `url(${this.state.urlImage}) `,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    ></div>
                                    {this.state.isOpenImage && (
                                        <Lightbox mainSrc={this.state.urlImage} onCloseRequest={this.handlePreviewImage} />
                                    )}
                                </>
                            )}
                        </div>
                        <div className="col col-12 mt-4 ">
                            <div>Description</div>
                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={this.state.description}
                                onChange={(e) => this.handleSelectInput(e)}
                                style={{ width: '100%', padding: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="title"> Detail Infomation Clinic</div>
                    <MdEditor
                        style={{ height: '480px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                    <button className="btn btn-primary mt-4" onClick={this.handleSaveInfoSpecialty}>
                        Post
                    </button>
                    <div style={{ height: '100px' }}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allSpecialty: state.admin.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialty: (type) => dispatch(actions.fetchApiStart(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
