//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

//config
import { appConfig } from '../../../../constant';

//action
import { onGetAllCustomer, onDeleteCustomer, onGetOneCustomer } from '../../actions';
class Customer extends Component {
    constructor(props){
        super(props);
        this.state={};
    }


    onDeleteCustomer = (id) => {
        this.onDeleteCustomerRequest(id);
    };

    onUpdateCustomer = (id) => {
        this.props.onGetOneCustomer({
            id:id,
        });
    };

    onDeleteCustomerRequest = async (id) => {
        const deleteCustomer = await axios({
            method: 'DELETE',
            url: `${appConfig.API_URL}/customers/${id}`,
            data: {},
        })
        if(deleteCustomer){
            this.props.onDeleteCustomer({
                id: id
            })
        }
    };

    render() {

        let { customer, index } = this.props;
        return (
            <>
                <tr className='row100 body'>
                    <td className='cell100 column1' style={{ display: 'flex', width: '79px' }}>
                        {index}
                    </td>
                    <td className='cell100 column2' style={{ width: '200px' }}>
                        {customer.id}
                    </td>
                    <td className='cell100 column3' style={{ width: '250px' }}>
                        {customer.tenkh}
                    </td>
                    <td className='cell100 column4' style={{ width: '250px' }}>
                        {customer.diachi}
                    </td>
                    <td className='cell100 column5' style={{ width: '250px' }}>{customer.sdt}</td>
                    <td className='cell100 column6' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '261px' }}>
                        <button type='button' className='btn btn-secondary mr-20' onClick={() => this.onDeleteCustomer(customer.id)}>
                            <i className='far fa-trash-alt' style={{ margin: '0 5px' }}></i>
                            Xóa
                        </button>
                        <button
                            type='button'
                            className='btn btn-success mr-20'
                            onClick={() => this.onUpdateCustomer(customer.id)}
                            data-toggle='modal'
                            data-target='#myModal'
                        >
                            <i className='far fa-edit' style={{ margin: '0 5px' }}></i>
                            Sửa
                        </button>
                    </td>
                </tr>
            </>
        );
    }
}
const mapDispatchToProps = {
    onGetAllCustomer,
    onDeleteCustomer,
    onGetOneCustomer,
};

export default connect(null, mapDispatchToProps)(Customer);
