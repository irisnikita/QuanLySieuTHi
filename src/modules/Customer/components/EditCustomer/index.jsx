//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Toast from 'light-toast';

//action
import { onAddCustomer, onUpdateCustomer, onResetCustomer } from '../../actions';

//config
import { appConfig } from '../../../../constant';

// Assets
import './style.css';

var isphone = false;
var var_phone = 0;

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tenkh: '',
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
            alert('Bạn nhập chưa chính xác');
        } else {
            if (this.state.idchange === 0) {
                Toast.success('Thêm khách hàng thành công !',1000)
                this.addCustomerRequest();
            }
            if (this.state.idchange !== 0) {
                Toast.success('Cập nhật khách hàng thành công !',1000)
                this.updateCustomerRequest();
            }
        }

        console.log(this.state);
    };

    componentDidUpdate() {}

    updateCustomerRequest = async () => {
        const { id, tenkh, diachi, sdt } = this.state;

        const updateCustomer = await axios({
            method: 'PUT',
            url: `${appConfig.API_URL}/customers/${id}`,
            data: {
                id,
                tenkh,
                diachi,
                sdt,
            },
        });
        if (updateCustomer) {
            this.props.onUpdateCustomer({
                Customer: {
                    id,
                    tenkh,
                    diachi,
                    sdt,
                },
            });
            this.setState({
                id: 0,
                tenkh: '',
                diachi: '',
                sdt: '',
                idchange: 0,
            });
            isphone = false;
        }
    };

    addCustomerRequest = async () => {
        const { id, tenkh, diachi, sdt } = this.state;

        let newCustomer = {
            id: parseInt(id),
            tenkh,
            diachi,
            sdt,
        };
        const addCustomer = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/customers/`,
            data: newCustomer,
        });
        if (addCustomer) {
            if (addCustomer.data.code === 'ER_DUP_ENTRY') {
                alert('Bạn nhập trùng mã nhà cung cấp');
            } else {
                this.props.onAddCustomer({
                    Customer: {
                        id: addCustomer.data.id,
                        tenkh: addCustomer.data.tenkh,
                        diachi: addCustomer.data.diachi,
                        sdt: addCustomer.data.sdt,
                    },
                });
            }

            this.setState({
                id: 0,
                tenkh: '',
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
            tenkh: '',
            diachi: '',
            sdt: '',
            idchange: 0,
        });
        isphone = false;
        this.props.onResetCustomer();
    };

    UNSAFE_componentWillReceiveProps(props) {
        if (props.Customer.id !== 0) {
            this.setState({
                id: props.Customer.id,
                tenkh: props.Customer.tenkh,
                diachi: props.Customer.diachi,
                sdt: props.Customer.sdt,
                idchange: 1,
            });
            isphone=true;
            var_phone=props.Customer.sdt;
        }
    }
    render() {
        let { id, tenkh, sdt, diachi, idchange } = this.state;
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
                                    <label htmlFor='msnv'>Mã số Khách hàng thân thiết</label>
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
                                    <label htmlFor='name'>Tên khách hàng thân thiết</label>
                                    <input id='name' className='form-control' type='text' name='tenkh' value={tenkh} onChange={this.onChange} />
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
        Customer: state.Customers.CustomersReducer.editCustomer,
    };
}
const mapDispatchToProps = {
    onAddCustomer,
    onUpdateCustomer,
    onResetCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
