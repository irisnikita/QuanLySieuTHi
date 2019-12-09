//libaries
import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import { appConfig } from '../../constant';
import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment-timezone';
import _ from 'lodash';
import Toast from 'light-toast';

//components
import Rowbill from './components/Rowbill';

//actions
import { onGetAllHanghoa, onUpdateSoLuong } from '../HangHoa/actions';
import { onAddRowBillHoaDon, onAddSoHoaDon, onAddHoaDon, onResetHoadon } from './actions';
import { onAddCustomer, onGetAllCustomer } from '../Customer/actions';

//assets
import './style.css';
import KhachHang from './components/KhachHang';

class Hoadonbanhang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDropDown: false,
            id: 0,
            tenmh: 'Chọn tên',
            loaimh: '',
            dvt: '',
            soluong: 0,
            dongia: 0,
            thanhtien: 0,
            tongcong: 0,
            conhang: true,
            sohoadon: 0,
            soluongtongcong: 0,
            khachhang: {
                id: 0,
                tenkh: '',
                diachi: '',
                sdt: '',
                iskhtt: false,
            },
        };
    }

    showRowBill = () => {
        const { billselllist } = this.props;
        const { thanhtien } = this.state;
        return billselllist.map((item, index) => {
            return <Rowbill billsell={item} key={index} thanhtien={thanhtien} index={index} />;
        });
    };

    componentDidMount() {
        this.getlistHanghoa();
        this.getSohoadon();
        this.getCustomers();
    }

    componentDidUpdate(prevProps, prevState) {
        const { soluong, tongcong, id, khachhang } = this.state;
        const { billselllist } = this.props;
        const { listhanghoa } = this.props;
        if (!_.isEqual(soluong, prevState.soluong)) {
            this.thanhtien();
            listhanghoa.forEach(item => {
                if (id === item.id) {
                    if (item.soluong >= soluong) {
                        this.setState({
                            conhang: true,
                        });
                    } else {
                        this.setState({
                            conhang: false,
                        });
                    }
                }
            });
        }
        if (!_.isEqual(billselllist, prevProps.billselllist)) {
            this.tongcongfunction();
            this.soluongfunction();
        }
        if (!_.isEqual(tongcong, prevState.tongcong)) {
            if (tongcong >= 2000000) {
                this.setState({
                    khachhang: {
                        id: khachhang.id,
                        tenkh: khachhang.tenkh,
                        diachi: khachhang.diachi,
                        sdt: khachhang.sdt,
                        iskhtt: true,
                    },
                });
            }
        }
    }

    getSohoadon = async () => {
        const getsohoadon = await axios({
            url: `${appConfig.API_URL}/phieuhoadon`,
            method: 'GET',
            data: {},
        });
        if (getsohoadon) {
            this.props.onAddSoHoaDon({
                sohoadon: getsohoadon.data.length + 1,
            });
        }
    };

    onSelecthang = item => {
        this.setState({
            id: item.id,
            tenmh: item.tenmh,
            loaimh: item.loaimh !== null ? item.loaimh : 'Không có loại mặt hàng',
            dvt: item.dvt,
            dongia: item.dongia,
        });
    };

    getTenmh = () => {
        const { listhanghoa } = this.props;

        return listhanghoa.map((item, index) => {
            return (
                <span key={index} onClick={() => this.onSelecthang(item)}>
                    {item.tenmh}
                </span>
            );
        });
    };

    onToogleDropDown = e => {
        e.stopPropagation();
        const { isShowDropDown } = this.state;
        this.setState({
            isShowDropDown: !isShowDropDown,
        });
    };

    bodyClick = () => {
        this.setState({
            isShowDropDown: false,
        });
    };

    onChange = e => {
        this.setState({
            soluong: e.target.value,
        });
    };

    thanhtien = () => {
        const { soluong = 0, dongia = 0 } = this.state;
        this.setState({
            thanhtien: soluong * dongia,
        });
    };

    tongcongfunction = () => {
        const { billselllist } = this.props;
        billselllist.forEach(item => {
            this.setState({
                tongcong: this.state.tongcong + item.thanhtien,
            });
        });
    };

    soluongfunction = () => {
        const { billselllist } = this.props;
        billselllist.forEach(item => {
            this.setState({
                soluongtongcong: this.state.soluongtongcong + parseInt(item.soluong),
            });
        });
    };

    addRowBill = () => {
        const { id, tenmh, loaimh, dvt, soluong, dongia, thanhtien } = this.state;

        const billsell = {
            id,
            tenmh,
            loaimh,
            dvt,
            soluong,
            dongia,
            thanhtien,
        };

        this.props.onAddRowBillHoaDon({
            billsell,
        });
        this.setState({
            isShowDropDown: false,
            id: 0,
            tenmh: 'Chọn tên',
            loaimh: '',
            dvt: '',
            soluong: 0,
            dongia: 0,
            thanhtien: 0,
        });
    };

    onsubmit = e => {
        if (e.charCode === 13) {
            if (this.state.id !== 0) {
                if (this.state.conhang) {
                    this.addRowBill();
                } else {
                    Toast.fail('Sản phẩm đã hết hàng', 1000);
                }
            }
            else if(this.state.soluong <= 0 ){
                Toast.fail('Số lượng tối thiểu lớn hơn 0',1000);
            }
            else{
                Toast.fail('Bạn chưa chọn sản phẩm',1000);
            }
        }
    };

    onDeleteSoluong = async (id, hanghoa = {}) => {
        const ondeletesoluong = await axios({
            url: `${appConfig.API_URL}/listhanghoa/soluong/${id}`,
            method: 'PUT',
            data: { soluong: hanghoa.soluong },
        });
        if (ondeletesoluong.data === 'Update Success') {
            this.props.onUpdateSoLuong({
                hanghoa: hanghoa,
            });
        }
    };

    onPrint = () => {
        
        Toast.success('In hóa đơn thành công !', 1000);
        const { billselllist = [], listhanghoa = [] } = this.props;
        for (let i = 0; i < listhanghoa.length; i++) {
            for (let j = 0; j < billselllist.length; j++) {
                if (listhanghoa[i].id === billselllist[j].id) {
                    let hanghoa = {
                        id: parseInt(listhanghoa[i].id),
                        soluong: -billselllist[j].soluong,
                    };
                    let id = listhanghoa[i].id;
                    this.onDeleteSoluong(id, hanghoa);
                }
            }
        }

        this.addHoaDonRequest();

        if (this.state.tongcong >= 2000000) {
            this.addKhachHangTT();
        }
        this.props.onResetHoadon();
        this.setState({
            tongcong: 0,
            soluongtongcong: 0,
            khachhang: [],
        });
    };

    addHoaDonRequest = async () => {
        const addhoadon = await axios({
            url: `${appConfig.API_URL}/phieuhoadon/`,
            method: 'POST',
            data: {
                id: this.props.sohoadon,
                ngaylap: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
                tongtgia: this.state.tongcong,
                sohang: this.state.soluongtongcong,
            },
        });
        if (addhoadon) {
            if (addhoadon.data.code !== 'ER_DUP_ENTRY') {
                this.props.onAddHoaDon({
                    hoadon: addhoadon.data,
                });
            }
        }
    };

    onSaveKhachHang = data => {
        this.setState({
            khachhang: data,
        });
    };

    addKhachHangTT = async () => {
        const insertkhachhang = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/customers/`,
            data: this.state.khachhang,
        });
        if (insertkhachhang) {
            if (insertkhachhang.data.code !== 'ER_DUP_ENTRY') {
                this.props.onAddCustomer({
                    Customer: insertkhachhang.data,
                });
                Toast.success('Thêm Khách hàng thân thiết thành công !', 1000);
            }
        }
    };

    getCustomers = async () => {
        const getcustomers = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/customers/`,
            data: {},
        });

        if (getcustomers) {
            this.props.onGetAllCustomer({
                Customers: getcustomers.data,
            });
        }
    };

    getlistHanghoa = async () => {
        const getlistHanghoa = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/listhanghoa/`,
            data: {},
        });

        if (getlistHanghoa) {
            this.props.onGetAllHanghoa({
                listhanghoa: getlistHanghoa.data,
            });
        }
    };

    render() {
        const { isShowDropDown } = this.state;
        const { id, tenmh, loaimh, dvt, dongia, soluong, thanhtien, tongcong, conhang } = this.state;
        const { sohoadon } = this.props;
        const num_thanhtien = numeral(thanhtien).format('0,0.0');
        const num_dongia = numeral(dongia).format('0,0.0');
        const num_tongcong = numeral(tongcong).format('0,0.0');
        const { iskhtt } = this.state.khachhang;
        return (
            <>
                <ReactToPrint
                    onAfterPrint={this.onPrint}
                    trigger={() => (
                        <button type='button' className='btn btn-success' style={{ position: 'absolute', top: '20px' }}>
                            <i className='fas fa-print    ' style={{ marginRight: '10px' }}></i>
                            In Phiếu
                        </button>
                    )}
                    content={() => this.componentRef}
                />
                <div ref={el => (this.componentRef = el)} onClick={this.bodyClick}>
                    <div className='Logo-banner'>
                        <i className='logo'></i>
                        <div className='title-banner'>
                            Siêu thị PIPOCO , Siêu thị uy tín ,Giá rẻ
                            <br />
                            <p style={{ fontSize: '15px', fontWeight: 'normal' }}>Địa chỉ : 66/9 Bà Hoa Hưng p9 Q1 Tp.HCM</p>
                        </div>
                    </div>
                    <div className='title-hoadon'>HÓA ĐƠN BÁN HÀNG</div>
                    <form className='wrapper-infor-customer'>
                        <KhachHang onSaveKhachHang={this.onSaveKhachHang} Customers={this.props.Customers} />
                        <div className='iskh-tt'>
                            <i
                                className='fa fa-address-card'
                                style={{ color: `${iskhtt ? '#29e5d7' : '#949494'}`, marginRight: '10px' }}
                                aria-hidden='true'
                            ></i>
                            <span style={{ color: `${iskhtt ? '#29e5d7' : '#949494'}`, fontWeight: `${iskhtt ? 'bold' : 'normal'}` }}>{`${
                                iskhtt ? 'Khách hàng thân thiết' : 'Khách hàng bình thường'
                            }`}</span>
                        </div>
                        <div className='info-hoadon'>
                            <span style={{ fontSize: '20px', fontWeight: '500', textDecoration: 'underline' }}>Thông tin hóa đơn:</span>
                            <div style={{ margin: '10px 0px 0px 5px' }}>
                                <div style={{ display: 'flex' }}>
                                    <span style={{ fontWeight: 'bold' }}>Số:</span>
                                    <input
                                        type='number'
                                        value={sohoadon}
                                        readOnly
                                        style={{ borderBottom: '1px solid black', width: 100, marginLeft: 5 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Ngày:</span>
                                    <input
                                        type='text'
                                        readOnly
                                        value={moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')}
                                        style={{ borderBottom: '1px solid black', marginLeft: 5, width: 200 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <table className='table-hoadon'>
                        <thead>
                            <tr>
                                <th style={{ width: 110 }}>Stt</th>
                                <th style={{ width: 150 }}>Tên mặt hàng</th>
                                <th>Mã số mặt hàng</th>
                                <th>Loại mặt hàng</th>
                                <th>Đơn vị tính</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i
                                        className={conhang ? 'fa fa-check' : 'fa fa-times'}
                                        aria-hidden='true'
                                        style={{ margin: '0 5px', color: `${conhang ? '#26725d' : '#fe0f2e'}` }}
                                    ></i>
                                    <span>{conhang ? 'Còn hàng' : 'Hết hàng'}</span>
                                </td>
                                <td style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <input type='button' value={tenmh} style={{ width: 150, borderRadius: 5 }} />
                                    <i
                                        className='fa fa-caret-down'
                                        aria-hidden='true'
                                        onClick={this.onToogleDropDown}
                                        style={{ cursor: 'pointer' }}
                                    ></i>
                                    <div
                                        className='drop-down-tenmh'
                                        style={{ height: `${isShowDropDown ? '150px' : '0px'}`, opacity: `${isShowDropDown ? '1' : '0'}` }}
                                    >
                                        {this.getTenmh()}
                                    </div>
                                </td>
                                <td>
                                    <input type='number' readOnly value={id} placeholder='Mã số ' />
                                </td>
                                <td>
                                    <input type='text' readOnly value={loaimh} placeholder='Loại mặt hàng' />
                                </td>
                                <td>
                                    <input type='text' value={dvt} readOnly placeholder='Đơn vị tính' />
                                </td>
                                <td style={{ width: 100 }}>
                                    <input
                                        type='number'
                                        onKeyPress={this.onsubmit}
                                        name='soluong'
                                        value={soluong}
                                        onChange={this.onChange}
                                        placeholder='Số lượng'
                                    />
                                </td>
                                <td>{`${num_dongia} VND`}</td>
                                <td>{`${num_thanhtien} VND`}</td>
                            </tr>
                            {this.showRowBill()}
                        </tbody>
                    </table>
                    <div style={{ width: '100%', border: '1px solid grey', borderTop: 'none', padding: '5px 10px' }}>
                        <strong>Tổng cộng:</strong>
                        {` ${num_tongcong} vnđ`}
                    </div>
                    <div className='chu-ki' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <div style={{ width: '50%', textAlign: 'left', fontWeight: '600' }}>Chữ kí của nhân viên </div>
                        <div style={{ fontWeight: '600' }}>Chữ kí của khách hàng</div>
                    </div>
                    <div style={{ width: '100%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '50px' }}>
                        -----Xin Chân thành cảm ơn-----
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        listhanghoa: state.listHangHoa.listhanghoaReducer.listhanghoa,
        billselllist: state.Billsell.billsellReducer.list_row_bill,
        sohoadon: state.Billsell.billsellReducer.sohoadon,
        Customers: state.Customers.CustomersReducer.Customers,
    };
}

const mapDispatchToProps = {
    onGetAllHanghoa,
    onAddRowBillHoaDon,
    onAddSoHoaDon,
    onAddHoaDon,
    onResetHoadon,
    onAddCustomer,
    onGetAllCustomer,
    onUpdateSoLuong,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hoadonbanhang);
