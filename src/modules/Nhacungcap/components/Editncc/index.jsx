//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Toast from 'light-toast';

//action
import { onAddNcc, onUpdateNcc, onResetNcc } from '../../actions';

//config
import { appConfig } from '../../../../constant';

// Assets
import './style.css';

var isphone = false;
var var_phone = 0;

class Editncc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tenncc: '',
            diachi: '',
            sdt: '',
            idchange: 0,
        };
    }

    onChange = e => {
        let { name } = e.target;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value,
        });
        if (name === 'sdt') {
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
            Toast.fail('Bạn nhập chưa chính xác !',1000)
        } else {
            if (this.state.idchange === 0) {
                this.addNccRequest();
                Toast.success('Thêm thành công...',1000)

            }
            if (this.state.idchange !== 0) {
                Toast.success('Sửa thành công...',1000)
                this.updateNccRequest();
            }
        }

        console.log(this.state);
    };

    componentDidUpdate() {}

    updateNccRequest = async () => {
        const { id, tenncc, diachi, sdt } = this.state;

        const updateNcc = await axios({
            method: 'PUT',
            url: `${appConfig.API_URL}/listncc/${id}`,
            data: {
                id,
                tenncc,
                diachi,
                sdt,
            },
        });
        if (updateNcc) {
            this.props.onUpdateNcc({
                Ncc: {
                    id,
                    tenncc,
                    diachi,
                    sdt,
                },
            });
            this.setState({
                id: 0,
                tenncc: '',
                diachi: '',
                sdt: '',
                idchange: 0,
            });
            isphone = false;
        }
    };

    addNccRequest = async () => {
        const { id, tenncc, diachi, sdt } = this.state;

        let newNcc = {
            id: parseInt(id),
            tenncc,
            diachi,
            sdt,
        };
        const addNcc = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/listncc/`,
            data: newNcc,
        });
        if (addNcc) {
            if (addNcc.data.code === 'ER_DUP_ENTRY') {
                alert('Bạn nhập trùng mã nhà cung cấp');
            } else {
                this.props.onAddNcc({
                    Ncc: {
                        id: addNcc.data.id,
                        tenncc: addNcc.data.tenncc,
                        diachi: addNcc.data.diachi,
                        sdt: addNcc.data.sdt,
                    },
                });
            }

            this.setState({
                id: 0,
                tenncc: '',
                diachi: '',
                sdt: '',
                idchange: 0,
            });
            isphone = false;
        }
    };

    onSetDefaultState = () => {
        this.setState({
            id: 0,
            tenncc: '',
            diachi: '',
            sdt: '',
            idchange: 0,
        });
        isphone = false;
        this.props.onResetNcc();
    };

    UNSAFE_componentWillReceiveProps(props) {
        if (props.ncc.id !== 0) {
            this.setState({
                id: props.ncc.id,
                tenncc: props.ncc.tenncc,
                diachi: props.ncc.diachi,
                sdt: props.ncc.sdt,
                idchange: 1,
            });
            isphone=true;
            var_phone=props.ncc.sdt;
        }
    }
    render() {
        let { id, tenncc, sdt, diachi, idchange } = this.state;
        console.log(var_phone)
        return (
            <>
                <div className='row modal' id='myModal'>
                    <div className='col-9 col-sm-9 marign-modal-1' style={{ background: '#fff' }}>
                        <h1 style={{ marginBottom: 20, color: `${idchange === 0 ? '#00cccc' : '#e62e00'}` }}>
                            {idchange === 0 ? 'Thêm nhà cung cấp' : 'Chỉnh sửa nhà cung cấp'}
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-row'>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='msnv'>Mã số nhà cung cấp</label>
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
                                    <input id='phone' className='form-control' type='text' name='sdt' value={sdt} onChange={this.onChange} />
                                    <i
                                        className={`${isphone ? 'fa fa-check' : 'fa fa-times'}`}
                                        style={{
                                            position: 'absolute',
                                            right: 20,
                                            top: 42,
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
                                    <label htmlFor='name'>Tên nhà cung cấp</label>
                                    <input id='name' className='form-control' type='text' name='tenncc' value={tenncc} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='address'>Địa chỉ</label>
                                    <input id='address' className='form-control' type='text' name='diachi' value={diachi} onChange={this.onChange} />
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
        ncc: state.listncc.listnccReducer.editncc,
    };
}
const mapDispatchToProps = {
    onAddNcc,
    onUpdateNcc,
    onResetNcc,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editncc);
