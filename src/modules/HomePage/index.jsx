import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

//asset
import './style.css';

//config
import { appConfig } from '../../constant';

//components
import ClassChart from './components/Chart';
import { onGetAllCustomer } from '../Customer/actions';
import { onGetAllHanghoa } from '../HangHoa/actions';
import { onGetAllNcc } from '../Nhacungcap/actions';
import { onGetAllStaff } from '../Staff/components/liststaff/actions';
import { onGetAllBill } from '../PhieuMuaHang/actions';

//action
import { onLoginUser } from '../Layouts/containers/Login/actions';
import { Item } from 'rc-menu';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userlogin: {},
            isShow: false,
            listsolieu: [],
        };
    }

    componentDidMount() {
        this.getlistHanghoa();
        this.getCustomers();
        this.getlistncc();
        this.getStaffs();
        this.getAllBill();
        this.getMonth();
        this.setState({
            isShow: true,
        });

    }

    componentDidUpdate(prevProps) {
      const {Bill = []} = this.props;

      if (!_.isEqual(Bill, prevProps.Bill)) {
        this.getMonth();
      }
    }


    componentWillUnmount() {
        this.setState({
            isShow: false,
        });
    }

    getAllBill = async () => {
        const getallbill = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/phieumua/`,
            data: {},
        });
        if (getallbill) {
            this.props.onGetAllBill({
                Bill: getallbill.data,
            });
        }
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

    getStaffs = async () => {
        this.setState({ isloading: true });
        const getStaffs = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/staffs/`,
            data: {},
        });

        if (getStaffs) {
            this.setState({ isloading: false });
            this.props.onGetAllStaff({
                staffs: getStaffs.data,
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

    getMonth = () => {
        const { Bill = [] } = this.props;
        var tongcong = 0;
        let listData = [
          {
            month :1,
            tongcong: 0,
            sohang: 0
          },
          {
            month :2,
            tongcong: 0,
            sohang: 0
          },
          {
            month :3,
            tongcong: 0,
            sohang: 0
          },
          {
            month :4,
            tongcong: 0,
            sohang: 0
          },
          {
            month :5,
            tongcong: 0,
            sohang: 0
          },
          {
            month :6,
            tongcong: 0,
            sohang: 0
          },
          {
            month :7,
            tongcong: 0,
            sohang: 0
          },
          {
            month :8,
            tongcong: 0,
            sohang: 0
          },
          {
            month :9,
            tongcong: 0,
            sohang: 0
          },
          {
            month :10,
            tongcong: 0,
            sohang: 0
          },
          {
            month :11,
            tongcong: 0,
            sohang: 0
          },
          {
            month :12,
            tongcong: 0,
            sohang: 0
          },
        ];
        
        listData.map((data,index)=>{
          Bill.map((billitem)=>{
            const {ngay =''}=billitem
            const month = moment(ngay,'YYYY-MM-DD').format('MM');
            if(data.month===parseInt(month)){
              listData[index].sohang+=billitem.sohang;
              listData[index].tongcong+=billitem.tongcong;
            }
          })
        })

        this.setState({
          listsolieu: listData
        });
    };

    render() {
        let { userlogin = {} } = this.props;
        const { isShow, listsolieu } = this.state;
        const { Customers, listncc, staffs, listhanghoa } = this.props;
        return (
            <>
                <div className='row' style={{ marginTop: '20px' }}>
                    <Link
                        to='/customer'
                        className='col-xl-3 col-md-6 mb-4 card-content'
                        style={{ cursor: 'pointer', position: 'relative', left: `${isShow ? '0px' : '-500px'}`, transition: 'all 600ms' }}
                    >
                        <div className='card border-left-primary shadow h-100 py-2'>
                            <div className='card-body card-body2'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col mr-2'>
                                        <div
                                            className='text-xs font-weight-bold  text-uppercase mb-1'
                                            style={{ fontWeight: '500', color: '#4ea19d' }}
                                        >
                                            Khách Hàng TT
                                        </div>
                                        <div
                                            className='h5 mb-0 font-weight-bold text-gray-800'
                                            style={{ fontSize: '15px', color: '#9c9c9c' }}
                                        >{`Số Khách hàng: ${Customers.length}`}</div>
                                    </div>
                                    <div className='col-auto'>
                                        <i className='fas fa-smile    ' style={{ fontSize: '40px' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to='/nhacungcap'
                        className='col-xl-3 col-md-6 mb-4 card-content hover2'
                        style={{ cursor: 'pointer', position: 'relative', left: `${isShow ? '0px' : '-700px'}`, transition: 'all 700ms' }}
                    >
                        <div className='card border-left-primary shadow h-100 py-2' style={{ borderLeft: '5px solid rgb(194, 60, 36)' }}>
                            <div className='card-body card-body2'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col mr-2'>
                                        <div
                                            className='text-xs font-weight-bold  text-uppercase mb-1'
                                            style={{ fontWeight: '500', color: 'rgb(194, 60, 36)' }}
                                        >
                                            Nhà Cung cấp
                                        </div>
                                        <div
                                            className='h5 mb-0 font-weight-bold text-gray-800'
                                            style={{ fontSize: '15px', color: '#9c9c9c' }}
                                        >{`Số nhà cung cấp: ${listncc.length}`}</div>
                                    </div>
                                    <div className='col-auto'>
                                        <i className='fas fa-cart-plus   ' style={{ fontSize: '40px' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to='/staff'
                        className='col-xl-3 col-md-6 mb-4 card-content2'
                        style={{ cursor: 'pointer', position: 'relative', left: `${isShow ? '0px' : '-1100px'}`, transition: 'all 800ms' }}
                    >
                        <div className='card border-left-primary shadow h-100 py-2' style={{ borderLeft: '5px solid rgb(86, 221, 169)' }}>
                            <div className='card-body card-body2'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col mr-2'>
                                        <div
                                            className='text-xs font-weight-bold  text-uppercase mb-1'
                                            style={{ fontWeight: '500', color: 'rgb(86, 221, 169)' }}
                                        >
                                            Nhân viên
                                        </div>
                                        <div
                                            className='h5 mb-0 font-weight-bold text-gray-800'
                                            style={{ fontSize: '15px', color: '#9c9c9c' }}
                                        >{`Số Nhân viên: ${staffs.length}`}</div>
                                    </div>
                                    <div className='col-auto'>
                                        <i className='fas fa-users    ' style={{ fontSize: '40px' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to='/hanghoa'
                        className='col-xl-3 col-md-6 mb-4 card-content content-4'
                        style={{ cursor: 'pointer', position: 'relative', left: `${isShow ? '0px' : '-1400px'}`, transition: 'all 900ms' }}
                    >
                        <div className='card border-left-primary shadow h-100 py-2' style={{ borderLeft: '5px solid #ad25ad' }}>
                            <div className='card-body card-body2'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col mr-2'>
                                        <div
                                            className='text-xs font-weight-bold  text-uppercase mb-1'
                                            style={{ fontWeight: '500', color: '#ad25ad' }}
                                        >
                                            Mặt hàng
                                        </div>
                                        <div
                                            className='h5 mb-0 font-weight-bold text-gray-800'
                                            style={{ fontSize: '15px', color: '#9c9c9c' }}
                                        >{`Số mặt hàng: ${listhanghoa.length}`}</div>
                                    </div>
                                    <div className='col-auto'>
                                        <i className='fas fa-box-open    ' style={{ fontSize: '40px', transition: 'all 200ms' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <ClassChart listsolieu={listsolieu} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userlogin: state.Layouts.loginReducer.user,
        Customers: state.Customers.CustomersReducer.Customers,
        listncc: state.listncc.listnccReducer.listncc,
        staffs: state.liststaff.staffsReducer.staffs,
        listhanghoa: state.listHangHoa.listhanghoaReducer.listhanghoa,
        Bill: state.RowBillBuy.billBuyReducer.Bill,
    };
};

const mapDispatchToProps = {
    onLoginUser,
    onGetAllCustomer,
    onGetAllHanghoa,
    onGetAllNcc,
    onGetAllStaff,
    onGetAllBill,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
