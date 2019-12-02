// Libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { appConfig } from '../../../../constant';

//component
import Staff from '../staff';
import EditStaff from '../editstaff';

//action
import { onGetAllStaff, onDeleteStaff,onSearchStaff } from './actions';

//assets
import './style.css';

class ListStaff extends Component {
    constructor(props) {
        super(props);
        this.state={
            search : ''
        }
    }
    


    componentDidMount() {
        this.getStaffs();
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    handleChangeRowsPerPage = event => {
        this.setRowsPerPage(+event.target.value);
        this.setPage(0);
    };

    componentDidUpdate() {}

    showStaffs = () => {

        const { staffs } = this.props;
        return staffs.map((staff, index) => <Staff staff={staff} index={index} key={index} />);
    
    };

    onChangeSearch=(e)=>{
        this.setState({
            search: e.target.value
        })
        console.log(e.target.value)
        this.props.onSearchStaff({
            value : e.target.value
        })

    }

    getStaffs = async () => {
        const getStaffs = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/staffs/`,
            data: {},
        });

        if (getStaffs) {
            this.props.onGetAllStaff({
                staffs: getStaffs.data,
            });
        }
    };

    search=()=>{
        var n =-1;
        console.log(this.props.staffs)
        this.props.staffs.forEach((staff)=>{
            n=staff.tennv.indexOf('')
            if(n>=0){
                console.log(staff)
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h2 style={{ margin: '0 0 20px 0' }}>Quản lý nhân viên</h2>

                    <EditStaff />
                    <form className='form-inline' style={{ marginBottom: '20px' }}>
                        <div className='form-group'>
                            <button type='button' className='btn btn-outline-secondary' data-toggle='modal' data-target='#myModal'>
                                <i className='fa fa-plus' aria-hidden='true' style={{ marginRight: '5px' }}></i>
                                Thêm Nhân viên
                            </button>
                            <div className='input-group ' style={{marginLeft:'20px',zIndex:'0'}}>
                                <input type='text' className='form-control' name='search' value={this.state.search} onChange={this.onChangeSearch} placeholder='Tìm kiếm Theo Tên' />
                                <div className='input-group-append'>
                                    <button className='btn btn-secondary' type='button'>
                                        <i className='fa fa-search'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='table100 ver2 m-b-110 table-staff'>
                        <div className='table100-head'>
                            <table>
                                <thead>
                                    <tr className='row100 head'>
                                        <th className='cell100 column1' style={{ width: '5px' }}>
                                            STT
                                        </th>
                                        <th className='cell100 column2' style={{ width: '140px' }}>
                                            Mã số nhân viên
                                        </th>
                                        <th className='cell100 column3' style={{ width: '15%' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className='cell100 column4' style={{ width: '15%' }}>
                                            Năm sinh
                                        </th>
                                        <th className='cell100 column5'>Số điện thoại</th>
                                        <th className='cell100 column6'>Địa chỉ</th>
                                        <th className='cell100 column7' style={{ width: '100px' }}>
                                            Mã chức vụ
                                        </th>
                                        <th className='cell100 column8' style={{ textAlign: 'center' }}>
                                            Hành Động
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className='table100-body js-pscroll table-staff'>
                            <table>
                                <tbody>{this.showStaffs()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
function mapStateToProps (state){
    return {
        staffs: state.liststaff.staffsReducer.staffs,
        staffs2: state.liststaff.staffsReducer.staffs2
    };
};
const mapDispatchToProps = {
    onGetAllStaff,
    onDeleteStaff,
    onSearchStaff
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStaff);
