import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { appConfig } from '../../../../constant';


//action
import { onGetAllCustomer, onDeleteCustomer,onSearchCustomer } from '../../actions';


//component
import EditCustomer from '../EditCustomer';
import Customer from '../Customer'

//assets
import './style.css'

class ListCustomer extends Component {
    constructor(props) {
        super(props);
        this.state={
            search: ''
        }
    }
    
    

    componentDidMount() {
        this.getCustomers();
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    handleChangeRowsPerPage = event => {
        this.setRowsPerPage(+event.target.value);
        this.setPage(0);
    };

    componentDidUpdate() {}

    


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

    onChangeSearch=(e)=>{

        this.setState({
            search: e.target.value
        })
    }

    onShowCustomer = () => {

        const { Customers } = this.props;
        
        const {search=''}=this.state;

        return Customers.map((customer,index)=>{
                const {tenkh =''}=customer;

                if(tenkh.toLowerCase().indexOf(search.toLowerCase())>-1){
                    return <Customer customer={customer} index={index} key={index} />    
                }
                else return null;
                
            })
        
    
    };

    render() {
        return (
            <div>
                <div>
                    <h2 style={{ margin: '20px 0 20px 0' }}>
                        
                    <i className="far fa-user" style={{marginRight:10,color:'#00b3b3'}}></i>
                        Quản lý khách hàng thân thiết</h2>
                    <EditCustomer />
                    <form className='form-inline' style={{ marginBottom: '20px' }}>
                        <div className='form-group'>
                            <button type='button' className='btn btn-outline-secondary' data-toggle='modal' data-target='#myModal'>
                                <i className='fa fa-plus' aria-hidden='true' style={{ marginRight: '5px' }}></i>
                                Thêm khách hàng thân thiết
                            </button>
                            <div className='input-group ' style={{ marginLeft: '20px', zIndex: '0' }}>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='search'
                                    onChange={this.onChangeSearch}
                                    placeholder='Tìm kiếm Theo Tên'
                                />
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
                                        <th className='cell100 column2' style={{ width: '200px' }}>
                                            Mã khách hàng
                                        </th>
                                        <th className='cell100 column3' style={{ width: '250px' }}>
                                            Tên khách hàng
                                        </th>
                                        <th className='cell100 column4' style={{ width: '250px' }}>
                                            Địa chỉ
                                        </th>
                                        <th className='cell100 column5' style={{ width: '250px' }}>Số điện thoại</th>
                                        <th className='cell100 column6' style={{ textAlign: 'center' }}>
                                            Hành Động
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className='table100-body js-pscroll table-staff'>
                            <table>
                                <tbody>{this.onShowCustomer()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state){
    return {
        Customers: state.Customers.CustomersReducer.Customers,
        Customers2: state.Customers.CustomersReducer.Customers2
    };
};
const mapDispatchToProps = {
    onGetAllCustomer,
    onDeleteCustomer,
    onSearchCustomer
};


export default connect(mapStateToProps,mapDispatchToProps)(ListCustomer);
