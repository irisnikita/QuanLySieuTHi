//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Toast from 'light-toast';

//action
import { onAddHanghoa, onUpdateHanghoa, onResetHanghoa } from '../../actions';

//config
import { appConfig } from '../../../../constant';

// Assets
import './style.css';

class EditHanghoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tenmh: '',
            loaimh: '',
            dvt: '',
            soluong: 0,
            dongia: 0,
            idchange:0,
        };
    }

    onChange = e => {
        let { name } = e.target;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {}

    onSubmit = e => {
        e.preventDefault();
        if (this.state.idchange === 0) {
            Toast.success('Thêm Hàng hóa thành công !',1000)
            this.addHanghoaRequest();
        }
        if (this.state.idchange !== 0) {
            Toast.success('Sửa hàng hóa thành công !',1000)
            this.updateHanghoaRequest();
        }
    };

    componentDidUpdate() {}

    updateHanghoaRequest = async () => {
        const { id, tenmh, loaimh, dvt, soluong, dongia } = this.state;

        const updatehanghoa = await axios({
            method: 'PUT',
            url: `${appConfig.API_URL}/listhanghoa/${id}`,
            data: {
                id,
                tenmh,
                loaimh,
                dvt,
                soluong: parseInt(soluong),
                dongia: parseInt(dongia),
            },
        });
        if (updatehanghoa) {
            this.props.onUpdateHanghoa({
                hanghoa: {
                    id,
                    tenmh,
                    loaimh,
                    dvt,
                    soluong: parseInt(soluong),
                    dongia: parseInt(dongia),
                },
            });
            this.setState({
                id: 0,
                tenmh: '',
                loaimh: '',
                dvt: '',
                soluong: 0,
                dongia: 0,
            });
        }
    };

    addHanghoaRequest = async () => {
        const { id, tenmh, loaimh, dvt,soluong,dongia } = this.state;

        let newHanghoa = {
            id: parseInt(id),
            tenmh,
            loaimh,
            dvt,
            soluong: parseInt(soluong),
            dongia: parseInt(dongia)
        };
        const addHanghoa = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/listhanghoa/`,
            data: newHanghoa,
        });
        if (addHanghoa) {
            if (addHanghoa.data.code === 'ER_DUP_ENTRY') {
                alert('Bạn nhập trùng mã nhà cung cấp');
            } else {
                this.props.onAddHanghoa({
                    hanghoa: {
                        id: addHanghoa.data.id,
                        tenmh: addHanghoa.data.tenmh,
                        loaimh: addHanghoa.data.loaimh,
                        dvt: addHanghoa.data.dvt,
                        soluong: addHanghoa.data.soluong,
                        dongia: addHanghoa.data.dongia,
                    },
                });
            }

            this.setState({
                id: 0,
                tenmh: '',
                loaimh: '',
                dvt: '',
                soluong: 0,
                dongia: 0,
            });
        }
    };

    onSetDefaultState = () => {
        this.setState({
            id: 0,
                tenmh: '',
                loaimh: '',
                dvt: '',
                soluong: 0,
                dongia: 0,
        });
        this.props.onResetHanghoa();
    };

    UNSAFE_componentWillReceiveProps(props) {
        if (props.hanghoa.id !== 0) {
            this.setState({
                id: props.hanghoa.id,
                tenmh: props.hanghoa.tenmh,
                loaimh: props.hanghoa.loaimh,
                dvt: props.hanghoa.dvt,
                soluong: props.hanghoa.soluong,
                dongia: props.hanghoa.dongia,
                idchange: 1,
            });
        }
    }
    render() {
        let { id, tenmh, loaimh, dvt,soluong,dongia, idchange } = this.state;
        return (
            <>
                <div className='row modal' id='myModal'>
                    <div className='col-9 col-sm-9 marign-modal-1' style={{ background: '#fff' }}>
                        <h1 style={{ marginBottom: 20, color: `${idchange === 0 ? '#00cccc' : '#e62e00'}` }}>
                            {idchange === 0 ? 'Thêm hàng hóa' : 'Chỉnh sửa hàng hóa'}
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
                                    <label htmlFor='phone'>Tên mặt hàng</label>
                                    <input id='phone' className='form-control' type='text' name='tenmh' value={tenmh} onChange={this.onChange} />
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
                                    <label htmlFor='name'>Loại mặt hàng</label>
                                    <input id='name' className='form-control' type='text' name='loaimh' value={loaimh} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='address'>Đơn vị tính</label>
                                    <input id='address' className='form-control' type='text' name='dvt' value={dvt} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='name'>Số lượng</label>
                                    <input id='name' className='form-control' type='number' name='soluong' value={soluong} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pl-0'>
                                    <label htmlFor='address'>Đơn giá</label>
                                    <input id='address' className='form-control' type='number' name='dongia' value={dongia} onChange={this.onChange} />
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
        hanghoa: state.listHangHoa.listhanghoaReducer.edithanghoa,
    };
}
const mapDispatchToProps = {
    onAddHanghoa,
    onUpdateHanghoa,
    onResetHanghoa,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditHanghoa);
