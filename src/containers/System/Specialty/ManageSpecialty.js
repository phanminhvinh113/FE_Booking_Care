import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './Style/ManageSpecialty.scss';
import { getSpecialtyById, postInfoSpecialty } from '../../../services/adminService';
import { toast } from 'react-toastify';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
////

class ManageSpecialty extends Component {
    ///// /////////////////
    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: [],
            selectedSpecialty: {},
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            image: '',
            urlImage: '',
            isDownloadImage: false,
            isOpenImage: false,
            hasOldData: false,
        };
    }
    // DID MOUNT //
    async componentDidMount() {
        await this.props.getAllSpecialty('SPECIALTY');
    }
    // DID UPDATE
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allSpecialty } = this.props;

        if (prevProps.allSpecialty !== allSpecialty) {
            this.setState({
                allSpecialty: this.setUpOptionFill(allSpecialty),
            });
        }
    } //
    setUpOptionFill = (data) => {
        return data.map((item) => ({
            label: item.valueVI,
            value: item.keyMap,
            type: item.type,
        }));
    };
    //
    handleChangeSelectSpeacialty = async (selectedSpecialty) => {
        const { data: res } = await getSpecialtyById(selectedSpecialty.value);
        if (res && res.errCode === 0 && res.data) {
            const { contentMarkdown, contentHTML, description, image } = res.data;
            const imageBase64 = Buffer.from(image, 'base64').toString('binary');
            this.setState({
                contentMarkdown,
                contentHtml: contentHTML,
                description,
                urlImage: imageBase64,
                hasOldData: true,
                isDownloadImage: true,
            });
        } else {
            this.setState({
                image: '',
                urlImage: '',
                hasOldData: false,
                isDownloadImage: false,
            });
        }
        this.setState({
            selectedSpecialty,
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
        const { contentMarkdown, contentHtml, description, selectedSpecialty, image } = this.state;

        const { data: res } = await postInfoSpecialty({
            specialtyId: selectedSpecialty.value,
            contentHtml,
            contentMarkdown,
            description,
            image,
            name: selectedSpecialty.label,
        });
        if (res && res.errCode === 0) {
            toast.success(res.message);
            this.setState({
                selectedSpecialty: {},
                contentMarkdown: '',
                contentHtml: '',
                description: '',
                image: '',
                urlImage: '',
                isDownloadImage: false,
                isOpenImage: false,
                hasOldData: false,
            });
        }
    };
    /////////// SUBMIT FORM //////////
    ////// RENDER DISPLAY ///////////
    render() {
        const { selectedSpecialty, allSpecialty, hasOldData, description } = this.state;
        return (
            <div className="manage-specialty-system-page">
                <div className="container">
                    <div className="title"> Manage Speacialty</div>
                    <div className="row">
                        <div className="col col-6">
                            <div>Chọn chuyên khoa</div>
                            <Select
                                value={selectedSpecialty}
                                options={!!allSpecialty.length && allSpecialty}
                                onChange={this.handleChangeSelectSpeacialty}
                                placeholder="Chọn bác chuyên khoa"
                            />
                        </div>

                        <div className="col col-6 ">
                            <div>Tên chuyên khoa</div>
                            <input
                                className="form-control"
                                value={!_.isEmpty(selectedSpecialty) ? selectedSpecialty.label : ''}
                                placeholder="Name"
                            />
                        </div>

                        <div className="col col-6 mt-4 ">
                            <div>Chọn ảnh chuyên khoa</div>
                            <input
                                type="file"
                                onChange={(e) => this.handleSelectImage(e)}
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="col col-6 mt-4">
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
                                value={description}
                                onChange={(e) => this.hanldeChangeDescription(e)}
                                style={{ width: '100%', padding: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="title"> Detail Infomation Specialty</div>
                    <MdEditor
                        style={{ height: '480px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                    <button className="btn btn-primary mt-4" onClick={this.handleSaveInfoSpecialty}>
                        {!hasOldData ? 'Save' : 'Update'}
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
