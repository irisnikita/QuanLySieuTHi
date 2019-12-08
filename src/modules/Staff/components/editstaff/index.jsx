//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

//action
import { onAddStaff, onUpdateStaff ,onResetStaff} from '../liststaff/actions';

//config
import { appConfig } from '../../../../constant';

// Assets
import './style.css';

var isphone = false;
var var_phone = 0;

class EditStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            msnv: 0,
            tennv: '',
            date: '',
            phone: 0,
            address: '',
            machucvu: 0,
            idchange: 0,
            isdropdown: false,
            tenchucvu: 'Chọn Chức Vụ',
        };
    }

    onChange = e => {
        let { name } = e.target;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value,
        });
        if (name === 'phone') {
            var_phone = e.target.value;
        }
        if (var_phone.length === 10) {
            isphone = true;
        } else {
            isphone = false;
        }
    };

    componentDidMount() {}

    onSubmit = e => {
        e.preventDefault();
        if (isphone !== true) {
            alert('Bạn nhập chưa chính xác');
        } else {
            if (this.state.idchange === 0) {
                this.addStaffRequest();
            }
            if (this.state.idchange !== 0) {
                this.updateStaffRequest();
            }
        }

        console.log(this.state);
    };

    componentDidUpdate() {
        
    }

    updateStaffRequest = async () => {
        const { id, msnv, tennv, date, phone, address, machucvu, tenchucvu } = this.state;

        const updateStaff = await axios({
            method: 'PUT',
            url: `${appConfig.API_URL}/staffs/${id}`,
            data: {
                msnv,
                tennv,
                date,
                phone,
                address,
                machucvu,
            },
        });
        if (updateStaff) {
            this.props.onUpdateStaff({
                staff: {
                    id,
                    msnv,
                    tennv,
                    date,
                    phone,
                    tenchucvu,
                    address,
                },
            });
            this.setState({
                id: 0,
                msnv: 0,
                tennv: '',
                date: '',
                phone: 0,
                address: '',
                machucvu: 0,
                idchange: 0,
                tenchucvu: 'Chọn Chức Vụ'
            });
            isphone = false;
        }
    };

    addStaffRequest = async () => {
        const { id, tennv, date, phone, address, machucvu, tenchucvu } = this.state;

        let newstaff = {
            id: parseInt(id),
            tennv,
            date,
            phone: parseInt(phone),
            address,
            machucvu: parseInt(machucvu),
        };
        const addStaff = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/staffs/`,
            data: newstaff,
        });
        if (addStaff) {
            if (addStaff.data.code === 'ER_DUP_ENTRY') {
                alert('Bạn nhập trùng msnv');
            } else {
                this.props.onAddStaff({
                    staff: {
                        id: addStaff.data.id,
                        tennv: addStaff.data.tennv,
                        date: addStaff.data.date,
                        phone: addStaff.data.phone,
                        address: addStaff.data.address,
                        tenchucvu: tenchucvu,
                    },
                });
            }

            this.setState({
                id: 0,
                msnv: 0,
                tennv: '',
                date: '',
                phone: 0,
                address: '',
                idchange: 0,
                tenchucvu: 'Chọn Chức Vụ'
            });
            isphone = false;
        }
    };

    turnOffDropDown=()=>{
        this.setState({
            isdropdown:false
        })
    }

    onClickDropDown = (e) => {
        e.stopPropagation();
        this.setState({
            isdropdown: !this.state.isdropdown,
        });
    };

    setvaluedropdown = (value, namevalue) => {
        this.setState({
            machucvu: value,
            tenchucvu: namevalue,
        });
    };

    onSetDefaultState=()=>{
        this.setState({
            id: 0,
            msnv: 0,
            tennv: '',
            date: '',
            phone: 0,
            address: '',
            idchange: 0,
            tenchucvu: 'Chọn Chức Vụ'
        });
        isphone = false;
        this.props.onResetStaff()
    }

    UNSAFE_componentWillReceiveProps(props) {
        var niceday = moment(props.staff.date).format('YYYY-MM-DD');
        if (props.staff.id !==0 ) {
            this.setState({
                id: props.staff.id,
                tennv: props.staff.tennv,
                date: niceday,
                phone: parseInt(0 + '' + props.staff.phone),
                address: props.staff.address,
                tenchucvu: props.staff.tenchucvu,
                idchange: 1,
            });
        }
        
    }
    render() {
        let { id, tennv, date, phone, address, idchange } = this.state;
        return (
            <>
                <div className='row modal' id='myModal' onClick={this.turnOffDropDown}>
                    <div className='col-9 col-sm-9 marign-modal-1' style={{ background: '#fff' }}>
                        <h1 style={{ marginBottom: 20, color: `${idchange === 0 ? '#00cccc' : '#e62e00'}` }}>
                            {idchange === 0 ? 'Thêm nhân viên' : 'Chỉnh sửa nhân viên'}
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-row'>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='msnv'>Mã số nhân viên</label>
                                    <input
                                        id='msnv'
                                        className='form-control'
                                        type='number'
                                        name='id'
                                        value={id}
                                        onChange={this.onChange}
                                        readOnly={idchange === 0 ? false : true}
                                    />
                                </div>
                                <div className='form-group col-3 pl-0  mr-20'>
                                    <label htmlFor='phone'>Số điện thoại</label>
                                    <input id='phone' className='form-control' type='number' name='phone' value={phone} onChange={this.onChange} />
                                    <i
                                        className={`${isphone ? 'fa fa-check' : 'fa fa-times'}`}
                                        style={{
                                            position: 'absolute',
                                            right: 40,
                                            top: 43,
                                            fontSize: '20px',
                                            color: `${isphone ? '#1aff1a' : '#ff9900'}`,
                                        }}
                                        aria-hidden='true'
                                    ></i>
                                </div>
                                <div className='form-group col-3 pl-0'>
                                    <div className='mt-27'>
                                        <button
                                            type='submit'
                                            data-toggle='modal'
                                            data-target='#myModal'
                                            className={`btn ${idchange > 0 ? 'btn-danger' : 'btn-primary'} size-120 mr-20 width-100`}
                                        >
                                            <i className={idchange > 0 ? 'far fa-edit' : 'fas fa-plus'} style={{ margin: '0 5px' }}></i>
                                            {idchange > 0 ? 'Sửa' : 'Thêm'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='name'>Họ tên</label>
                                    <input id='name' className='form-control' type='text' name='tennv' value={tennv} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='address'>Địa chỉ</label>
                                    <input
                                        id='address'
                                        className='form-control'
                                        type='text'
                                        name='address'
                                        value={address}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='my-input'>Ngày sinh</label>
                                    <input id='my-input' className='form-control' type='date' name='date' value={date} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='machucvu'>Mã chức vụ</label>
                                    <i className="fa fa-caret-down hover-color" aria-hidden="true" style={{position:'absolute',right:20,top:40,fontSize:25}} 
                                        onClick={this.onClickDropDown}></i>
                                    <input
                                        id='machucvu'
                                        className='form-control'
                                        type='button'
                                        name='machucvu'
                                        value={this.state.tenchucvu}
                                    />
                                    <div className='dropdown-machucvu' style={{ display: `${this.state.isdropdown ? 'flex' : 'none'}` }}>
                                        <div className='item-dropdown' onClick={() => this.setvaluedropdown(1, 'Nhân viên bán Hàng')}>
                                            Nhân viên bán Hàng
                                        </div>
                                        <div className='item-dropdown' onClick={() => this.setvaluedropdown(2, 'Thủ Kho')}>
                                            Thủ Kho
                                        </div>
                                        <div className='item-dropdown' onClick={() => this.setvaluedropdown(3, 'Bộ phận quản lý')}>
                                            Bộ Phận Quản lý
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <button type='button' className='btn btn-danger' data-toggle='modal' data-target='#myModal' onClick={this.onSetDefaultState}>
                            <i className='fas fa-times' style={{ margin: '0 5px' }}></i>
                            Close
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        staff: state.liststaff.staffsReducer.editStaff,
    };
}
const mapDispatchToProps = {
    onAddStaff,
    onUpdateStaff,
    onResetStaff
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStaff);
