import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { getDetailInfoDoctor } from '../../../services/adminService';
import { manageActions } from '../../../utils/constant';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
/////// OPTION SELECT /////

/////
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            nameClinic: '',
            addressClinic: '',
            selectedDoctor: null,
            selectedProvince: null,
            selectedPrice: null,
            selectedPayment: null,
            selectedSpecialty: null,
            selectedClinic: null,
            //
            listDoctor: [],
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            //
            hasOldData: false,
        };
        this.promises = [
            this.props.getAllDoctor(),
            this.props.getDataToFill('PROVINCE'),
            this.props.getDataToFill('PRICE'),
            this.props.getDataToFill('PAYMENT'),
            this.props.getDataToFill('SPECIALTY'),
        ];
    }
    //// DID MOUNT ////
    async componentDidMount() {
        await Promise.all(this.promises);
    }

    /// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allDoctors, dataToFill } = this.props;
        if (prevProps.allDoctors !== allDoctors) {
            this.setState({
                listDoctor: allDoctors,
            });
        }
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

    ///// CHANGE INPUT /////
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        });
    };
    /// SET UP OPTIONS FOR SELECT ///
    setUpOptionFill = (data) => {
        return data.map((item) => ({
            label: item.valueVI,
            value: item.keyMap,
            type: item.type,
        }));
    };
    /////// CHANGE SELECT ////
    handleChangeSelectDoctor = async (selectedDoctor) => {
        const { data: res } = await getDetailInfoDoctor(selectedDoctor.id);
        const { listPrice, listPayment, listProvince, listSpecialty } = this.state;
        if (res && res.errCode === 0 && res.data) {
            const { Markdown: markdown, DoctorInfo } = res.data;
            if (DoctorInfo) {
                const { priceId, provinceId, paymentId, nameClinic, addressClinic, specialtyId, name } = DoctorInfo;
                const selectedPrice = listPrice.find((item) => item.value === priceId);
                const selectedProvince = listProvince.find((item) => item.value === provinceId);
                const selectedPayment = listPayment.find((item) => item.value === paymentId);
                const selectedSpecialty = listSpecialty.find((item) => item.value === specialtyId);
                this.setState({
                    name,
                    selectedPrice,
                    selectedProvince,
                    selectedPayment,
                    selectedSpecialty,
                    nameClinic,
                    addressClinic,
                });
            } else {
                this.setState({
                    name: ' ',
                    nameClinic: '',
                    addressClinic: '',
                    selectedPrice: null,
                    selectedProvince: null,
                    selectedPayment: null,
                    selectedSpecialty: null,
                });
            }
            if (markdown) {
                this.setState({
                    contentHtml: markdown.contentHtml,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    hasOldData: true,
                });
            } else {
                this.setState({
                    contentHtml: '',
                    contentMarkdown: '',
                    description: '',
                    nameClinic: '',
                    addressClinic: '',
                    hasOldData: false,
                    selectedPrice: null,
                    selectedProvince: null,
                    selectedPayment: null,
                    selectedSpecialty: null,
                });
            }
        } else {
            toast.error(res.message);
        }
        this.setState({ selectedDoctor });
    };
    ////// HANDLE ON CHANGE SELECT INFO CLINIC FOR DOCTOR ////
    handleChangeSelectInfoMedical = (selectedInfo, name) => {
        const listType = this.state;
        listType[name.name] = selectedInfo;
        this.setState(
            {
                ...listType,
            },
            () => console.log(this.state),
        );
    };
    ////// HANDLE ON ChANGE INPUT CLINIC /////////
    handleChangeInputClinic = (e, type) => {
        const copyState = this.state;
        copyState[type] = e.target.value;
        this.setState({
            ...copyState,
        });
    };
    //// HANDLE CHANGE INPUT TEXT AREA  ////
    handleChangeDesc = (e) => {
        this.setState({
            description: e.target.value,
        });
    };

    //////// SAVE CONTENT //////
    handleSaveInfoDoctor = async () => {
        const {
            name,
            selectedProvince,
            selectedPrice,
            selectedPayment,
            selectedSpecialty,
            contentHtml,
            description,
            hasOldData,
            contentMarkdown,
            selectedDoctor,
            nameClinic,
            addressClinic,
        } = this.state;
        await this.props.saveDetailInfoDoctor({
            name,
            doctorId: selectedDoctor.id,
            contentHtml: contentHtml,
            contentMarkdown: contentMarkdown,
            description: description,
            priceId: selectedPrice.value,
            paymentId: selectedPayment.value,
            provinceId: selectedProvince.value,
            specialtyId: selectedSpecialty.value,
            nameClinic,
            addressClinic,
            action: hasOldData ? manageActions.EDIT : manageActions.CREATE,
        });
        this.setState({
            name: '',
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            nameClinic: '',
            addressClinic: '',
            selectedDoctor: null,
            selectedPrice: null,
            selectedProvince: null,
            selectedPayment: null,
            selectedSpecialty: null,
        });
    };

    //// RENDER ///
    render() {
        const { listDoctor, hasOldData, listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

        const option = listDoctor.map((doctor) => {
            const nameDoctor = doctor.lastName + ' ' + doctor.firstName;
            return {
                value: nameDoctor,
                label: nameDoctor,
                id: doctor.id,
            };
        });
        return (
            <>
                <div className="manage-doctor-container container ">
                    <h1 className="title mt-4"> MANAGE DOCTOR</h1>
                    <div className="row mt-4 mb-4">
                        <div className="col-6 mt-4">
                            <div>Chọn bác sĩ</div>
                            <Select
                                value={this.state.selectedDoctor}
                                options={option}
                                onChange={this.handleChangeSelectDoctor}
                                placeholder="Chọn bác sĩ"
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <label>Tên bác sĩ và chức danh</label>
                            <input
                                className="form-control"
                                value={this.state.name}
                                onChange={(e) => this.handleChangeInputClinic(e, 'name')}
                            />
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
                                onChange={(e) => this.handleChangeInputClinic(e, 'nameClinic')}
                            />
                        </div>

                        <div className="col-6 mt-4">
                            <label>Địa Chỉ Phòng Khám</label>
                            <input
                                className="form-control"
                                value={this.state.addressClinic}
                                onChange={(e) => this.handleChangeInputClinic(e, 'addressClinic')}
                            />
                        </div>

                        {/* //////////////////////////// */}
                        <div className="col-12 mt-4">
                            <div>Desciption</div>
                            <textarea
                                rows="4"
                                style={{ width: '100%', padding: '10px' }}
                                onChange={(e) => this.handleChangeDesc(e)}
                                value={this.state.description}
                            />
                        </div>
                    </div>
                    <div className="title"> Detail Infomation Doctor</div>
                    <MdEditor
                        style={{ height: '480px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                    <button className="btn btn-primary mt-4" onClick={this.handleSaveInfoDoctor}>
                        {!hasOldData ? 'Save' : 'Update'}
                    </button>
                    <div style={{ height: '100px' }}></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataToFill: state.admin.data,
        systemMenuPath: state.app.systemMenuPath,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
        saveDetailInfoDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getDataToFill: (type) => dispatch(actions.fetchApiStart(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
