import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailInfoDoctor } from '../../services/adminService';
import { CommonUtils, manageActions } from '../../utils';
import './Style/PersonalityDoctor.scss';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class PersonalityDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            UrlImage: '',
            image: '',
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            nameClinic: '',
            addressClinic: '',
            doctorId: null,
            selectedProvince: null,
            selectedPrice: null,
            selectedPayment: null,
            selectedSpecialty: null,
            selectedClinic: null,
            // LIST
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
        };
        this.promises = [
            this.props.getDataToFill('PROVINCE'),
            this.props.getDataToFill('PRICE'),
            this.props.getDataToFill('PAYMENT'),
            this.props.getDataToFill('SPECIALTY'),
        ];
    }
    async componentDidMount() {
        await Promise.all(this.promises);
        const { userInfo } = this.props;
        const { data: res } = await getDetailInfoDoctor(userInfo.id);
        const { listPrice, listPayment, listProvince, listSpecialty } = this.state;
        if (res && res.errCode === 0) {
            const { Markdown: markdown, DoctorInfo, image } = res.data;

            if (DoctorInfo) {
                const { priceId, provinceId, paymentId, nameClinic, addressClinic, specialtyId, name } = DoctorInfo;
                const selectedPrice = listPrice.find((item) => item.value === priceId);
                const selectedProvince = listProvince.find((item) => item.value === provinceId);
                const selectedPayment = listPayment.find((item) => item.value === paymentId);
                const selectedSpecialty = listSpecialty.find((item) => item.value === specialtyId);
                this.setState({
                    doctorId: userInfo.id,
                    UrlImage: image,
                    name,
                    selectedPrice,
                    selectedProvince,
                    selectedPayment,
                    selectedSpecialty,
                    nameClinic,
                    addressClinic,
                    contentHtml: markdown.contentHtml,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { dataToFill } = this.props;
        if (prevProps.dataToFill !== dataToFill) {
            if (dataToFill[0].type === 'PROVINCE') {
                const data = this.setUpOptionFill(dataToFill);
                this.setState({
                    listProvince: data,
                });
            }
            if (dataToFill[0].type === 'PRICE') {
                const data = this.setUpOptionFill(dataToFill);
                this.setState({
                    listPrice: data,
                });
            }
            if (dataToFill[0].type === 'PAYMENT') {
                const data = this.setUpOptionFill(dataToFill);
                this.setState({
                    listPayment: data,
                });
            }
            if (dataToFill[0].type === 'SPECIALTY') {
                const data = this.setUpOptionFill(dataToFill);
                this.setState({
                    listSpecialty: data,
                });
            }
        }
    }
    /// SET UP OPTIONS FOR SELECT ///
    setUpOptionFill = (data) => {
        return data.map((item) => ({
            label: item.valueVI,
            value: item.keyMap,
            type: item.type,
        }));
    };
    ////// HANDLE ON ChANGE INPUT CLINIC /////////
    handleChangeValueInput = (e, type) => {
        const copyState = this.state;
        copyState[type] = e.target.value;
        this.setState({
            ...copyState,
        });
    };
    //
    handleChangeSelectInfoMedical = (selectedInfo, name) => {
        const listType = this.state;
        listType[name.name] = selectedInfo;
        this.setState({
            ...listType,
        });
    };
    ///// CHANGE INPUT MARKDOWN /////
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        });
    };
    //
    handleChangeImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageBase64 = await CommonUtils.convertBase64(file);
            this.setState({
                UrlImage: URL.createObjectURL(file),
                image: imageBase64,
            });
        }
    };
    // HANDLE UPDATE DOCTOR
    handleSaveInfoDoctor = async () => {
        const {
            doctorId,
            name,
            image,
            selectedProvince,
            selectedPrice,
            selectedPayment,
            selectedSpecialty,
            contentHtml,
            description,
            contentMarkdown,
            nameClinic,
            addressClinic,
        } = this.state;
        await this.props.saveDetailInfoDoctor({
            doctorId,
            name,
            image,
            contentHtml: contentHtml,
            contentMarkdown: contentMarkdown,
            description: description,
            priceId: selectedPrice.value,
            paymentId: selectedPayment.value,
            provinceId: selectedProvince.value,
            specialtyId: selectedSpecialty.value,
            nameClinic,
            addressClinic,
            action: manageActions.EDIT,
        });
    };
    ///////////////////////////// \\ RENDER DISPLAY \\ ////////////////////////////////////////
    render() {
        const { listPayment, listPrice, listProvince, listSpecialty } = this.state;
        return (
            <div className="manage-info-personality-doctor ">
                <div className="container">
                    <h1 className="title-personality "> PERSONALITY</h1>
                    <div className="row mt-4 mb-4">
                        <div className="col-6 mt-4">
                            <label>Tên bác sĩ và chức danh</label>
                            <input className="form-control" value={this.state.name} onChange={(e) => this.handleChangeValueInput(e, 'name')} />
                        </div>
                        <div className="col-6 mt-4">
                            <div>Chuyên khoa</div>
                            <Select
                                value={this.state.selectedSpecialty ? this.state.selectedSpecialty : ''}
                                options={listSpecialty}
                                onChange={this.handleChangeSelectInfoMedical}
                                name="selectedSpecialty"
                                placeholder="Chọn chuyên khoa"
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <div>Tỉnh thành</div>
                            <Select
                                value={this.state.selectedProvince}
                                options={listProvince}
                                onChange={this.handleChangeSelectInfoMedical}
                                name="selectedProvince"
                                placeholder="Tỉnh thành"
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <div>Giá</div>
                            <Select
                                value={this.state.selectedPrice}
                                options={!!listPrice.length ? listPrice : []}
                                onChange={this.handleChangeSelectInfoMedical}
                                name="selectedPrice"
                                placeholder="Bảng Giá"
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <div>Phương Thức Thanh Toán</div>
                            <Select
                                value={this.state.selectedPayment}
                                options={listPayment}
                                onChange={this.handleChangeSelectInfoMedical}
                                name="selectedPayment"
                                placeholder="Phương thức thanh toán"
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <label>Tên Phòng Khám</label>
                            <input
                                className="form-control"
                                value={this.state.nameClinic}
                                onChange={(e) => this.handleChangeValueInput(e, 'nameClinic')}
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <label>Địa Chỉ Phòng Khám</label>
                            <input
                                className="form-control"
                                value={this.state.addressClinic}
                                onChange={(e) => this.handleChangeValueInput(e, 'addressClinic')}
                            />
                        </div>
                        <div className="col-3 mt-4">
                            <lable>Ảnh</lable>
                            <input className="form-control file-image" type={'file'} onChange={(e) => this.handleChangeImage(e)} />
                        </div>
                        <div className="col-3 mt-4 avatar-doctor">{!!this.state.UrlImage && <img src={this.state.UrlImage} />}</div>

                        {/* //////////////////////////// */}
                        <div className="col-12 mt-4">
                            <div>Desciption</div>
                            <textarea
                                rows="4"
                                style={{ width: '100%', padding: '10px' }}
                                onChange={(e) => this.handleChangeValueInput(e)}
                                value={this.state.description}
                            />
                        </div>
                    </div>

                    <h1 className="title-personality"> Detail Infomation Doctor</h1>
                    <MdEditor
                        style={{ height: '480px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                    <button className="btn btn-primary mt-4" onClick={this.handleSaveInfoDoctor}>
                        Save
                    </button>
                    <div style={{ height: '100px' }}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataToFill: state.admin.data,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDataToFill: (type) => dispatch(actions.fetchApiStart(type)),
        saveDetailInfoDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityDoctor);
