import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment-timezone';
import axios from 'axios';

//config
import { appConfig } from '../../constant';

//actions
import { onGetAllNcc, onGetOneNcc, onResetNcc } from '../Nhacungcap/actions';
import { onAddRowBill, onResetRowBill, onTongCong, onAddAllBill ,onGetSohoadon} from '../PhieuMuaHang/actions';

//assets
import './style.css';

//component
import ListBill from './components/listBill';
import AddRowBill from './components/addBill';

var tongcong = 0;
var sohang = 0;
class Phieumuahang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tenncc: '',
            diachi: '',
            sdt: '',
            sophieumua: 0,
            ngay: '',
            isDropDown: false,
        };
    }

    componentDidMount() {
        this.getlistncc();
        this.getAllBill();
    }

    getAllNcc = () => {
        let { listncc } = this.props;

        return listncc.map((ncc, index) => (
            <span key={index} onClick={() => this.onSelectNhaCungCap(ncc.id)}>
                {ncc.tenncc}
            </span>
        ));
    };

    getAllBill = async () => {
        const getallbill = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/phieumua/`,
            data: {},
        });
        if (getallbill) {
            this.props.onGetSohoadon({
                sohoadon: getallbill.data.length+1,
            });
        }
    };

    onSelectNhaCungCap = id => {
        let { listncc } = this.props;

        let targetIndex = listncc.findIndex(item => item.id === id);
        if (targetIndex > -1) {
            this.setState({
                id: listncc[targetIndex].id,
                tenncc: listncc[targetIndex].tenncc,
                diachi: listncc[targetIndex].diachi,
                sdt: listncc[targetIndex].sdt,
                isDropDown: false,
            });
        }
        this.props.onGetOneNcc({
            id: listncc[targetIndex].id,
        });
    };

    onPrint = () => {
        this.addbillRequest();
        this.props.onResetRowBill();
        this.props.onResetNcc();
        sohang = 0;
    };

    addbillRequest = async () => {
        const { sophieumua = 0, ngay = '' } = this.state;
        const { tongcong } = this.props;
        const { listRowBill,sohoadon } = this.props;
        listRowBill.forEach(item => {
            sohang += parseInt(item.soluong);
        });

        const addbill = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/phieumua`,
            data: {
                id: sohoadon,
                ngay: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
                tongcong,
                sohang,
            },
        });
        if (addbill) {
            this.props.onAddAllBill({
                bill: {
                    id: sohoadon,
                    ngay: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
                    tongcong,
                    sohang,
                },
            });
        }
    };

    onToggleDropDown = () => {
        this.setState({
            isDropDown: !this.state.isDropDown,
        });
    };

   

    ShowListBill = () => {
        const { listRowBill } = this.props;

        return listRowBill.map((rowbill, index) => {
            return <ListBill rowbill={rowbill} index={index} key={index} />;
        });
    };

    onChange = e => {
        let { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    getlistncc = async () => {
        const getlistncc = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/listncc/`,
            data: {},
        });

        if (getlistncc) {
            this.props.onGetAllNcc({
                listncc: getlistncc.data,
            });
        }
    };

    render() {
        const { ncc,sohoadon } = this.props;
        const fmt_tongcong = numeral(this.props.tongcong).format('0,0.0');
        
        return (
            <>
                <div style={{marginTop:20}}>
                    <ReactToPrint
                        onAfterPrint={this.onPrint}
                        trigger={() => (
                            <button type='button' className='btn btn-success'>
                                <i className='fas fa-print    ' style={{ marginRight: '10px' }}></i>
                                In Phiếu
                            </button>
                        )}
                        content={() => this.componentRef}
                    />
                </div>
                <div className='main-layout-buy' ref={el => (this.componentRef = el)}>
                    <div className='title-layout'>PHIẾU MUA HÀNG</div>
                    <div className='so-ngay' style={{ right: '45px' }}>
                        <label htmlFor='inputTen' style={{ margin: '0 0 0 0', fontSize: '15px', fontWeight: 'bold' }}>
                            Số :
                        </label>

                        <input
                            type='number'
                            name='sophieumua'
                            value={sohoadon}
                            readOnly
                            id='inputTen'
                            placeholder='Số phiếu mua'
                        />
                    </div>
                    <div className='so-ngay'>
                        <label htmlFor='inputTen' style={{ margin: '0 0 0 0', fontSize: '15px', fontWeight: 'bold' }}>
                            Ngày :
                        </label>

                        <input
                            type='date'
                            name='ngay'
                            readOnly
                            value={moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')}
                            onChange={this.onChange}
                            id='inputTen'
                            placeholder='Tên nhà cung cấp'
                        />
                    </div>
                    <div className='container form-phieu-xuat-hang'>
                        <div className='form-group row '>
                            <label htmlFor='inputId' className='col-sm-2 col-form-label custom-label'>
                                Tên nhà cung cấp
                            </label>
                            <div className='col-sm-10'>
                                <input type='button' onClick={this.onToggleDropDown} className='form-control' id='inputId' value={ncc.tenncc} />
                            </div>
                            <i className='fa fa-caret-down' aria-hidden='true' style={{ position: 'absolute', right: '135px', top: '185px' }}></i>
                            <div
                                className='Drop-mncc'
                                style={{
                                    height: `${this.state.isDropDown ? '100px' : '0px'}`,
                                    border: `${this.state.isDropDown ? '1px solid rgb(214, 214, 214)' : 'none'}`,
                                }}
                            >
                                {this.getAllNcc()}
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='inputTen' className='col-sm-2 col-form-label custom-label'>
                                Mã nhà cung cấp
                            </label>
                            <div className='col-sm-10'>
                                <input type='text' value={ncc.id} className='form-control' readOnly id='inputTen' placeholder='Tên nhà cung cấp' />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='inputAddress' className='col-sm-2 col-form-label custom-label'>
                                Địa chỉ
                            </label>
                            <div className='col-sm-10'>
                                <input type='text' value={ncc.diachi} className='form-control' readOnly id='inputAddress' placeholder='Địa chỉ' />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='inputPhone' className='col-sm-2 col-form-label custom-label'>
                                Số điện thoại
                            </label>
                            <div className='col-sm-10'>
                                <input type='text' value={ncc.sdt} className='form-control' readOnly id='inputPhone' placeholder='Số điện thoại' />
                            </div>
                        </div>
                    </div>
                    <div className='table100 ver1 m-b-110 table-upgrade'>
                        <div className='table100-head'>
                            <table>
                                <thead>
                                    <tr className='row100 head'>
                                        <th className='cell100 ' style={{ paddingLeft: 10 }}>
                                            STT
                                        </th>
                                        <th className='cell100 '>Mã số</th>
                                        <th className='cell100 '>Tên hàng</th>
                                        <th className='cell100 '>Đơn vị tính</th>
                                        <th className='cell100 '>Đơn giá </th>
                                        <th className='cell100 '>Số lượng</th>
                                        <th className='cell100 '>Thành tiền</th>
                                        <th className='cell100 '>Hành Động</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className='table100-body js-pscroll body-form' style={{ maxHeight: '2000px' }}>
                            <table>
                                <tbody>
                                    <AddRowBill />
                                    {this.ShowListBill()}
                                </tbody>
                            </table>
                        </div>
                        <div className='total'>
                            <span style={{ fontWeight: 'bold', fontSize: '25px' }}>Tổng cộng: </span>
                            <span style={{ fontSize: '25px' }}>{`${fmt_tongcong} VND`}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        listncc: state.listncc.listnccReducer.listncc,
        listRowBill: state.RowBillBuy.billBuyReducer.listRowBill,
        ncc: state.listncc.listnccReducer.editncc,
        tongcong: state.RowBillBuy.billBuyReducer.tongcong,
        Bill: state.RowBillBuy.billBuyReducer.Bill,
        sohoadon: state.RowBillBuy.billBuyReducer.sohoadon
    };
}

const mapDispatchToProps = {
    onGetAllNcc,
    onAddRowBill,
    onGetOneNcc,
    onResetNcc,
    onResetRowBill,
    onTongCong,
    onAddAllBill,
    onGetSohoadon
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Phieumuahang);
