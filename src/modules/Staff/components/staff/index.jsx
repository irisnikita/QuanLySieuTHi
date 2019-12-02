//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';

//config
import { appConfig } from '../../../../constant';

//action
import { onGetAllStaff, onDeleteStaff, onGetOneStaff } from '../liststaff/actions';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onDelete = id => {
        this.onDeleteRequest(id);
    };

    onUpdate = id => {
        this.props.onGetOneStaff({
            id,
        });
    };

    onDeleteRequest = async id => {
        const deleteStaff = await axios({
            method: 'DELETE',
            url: `${appConfig.API_URL}/staffs/${id}`,
            data: {},
        });

        if (deleteStaff) {
            this.props.onDeleteStaff({
                id: id,
            });
        }
    };

    render() {
        let { staff, index } = this.props;
        let niceday = moment(staff.date).format('YYYY-MM-DD');
        let phone = numeral(parseInt(staff.phone)).format('000,000,000');
        return (
            <>
                <tr className='row100 body'>
                    <td className='cell100 column1' style={{display:'flex', width:'79px'}}>{index}</td>
                    <td className='cell100 column2'style={{width:'140px'}} >{staff.id}</td>
                    <td className='cell100 column3' style={{width:'197px'}}>{staff.tennv}</td>
                    <td className='cell100 column4' style={{width:'197px'}}>{niceday}</td>
                    <td className='cell100 column5'>{0+""+phone}</td>
                    <td className='cell100 column6' style={{width:'174px'}}>{staff.address}</td>
        <td className='cell100 column7' style={{width:'100px',textAlign:'center'}}>{staff.tenchucvu}</td>
                    <td className='cell100 column8' style={{display: 'flex',alignItems:'center',justifyContent:'flex-end',width:'261px'}}>
                        <button type='button' className='btn btn-secondary mr-20' onClick={() => this.onDelete(staff.id)}>
                            <i className='far fa-trash-alt' style={{ margin: '0 5px' }}></i>
                            Xóa
                        </button>
                        <button type='button' className='btn btn-success mr-20' onClick={() => this.onUpdate(staff.id)} data-toggle='modal' data-target='#myModal'> 
                            <i className='far fa-edit'  style={{ margin: '0 5px' }}></i>
                            Sửa
                        </button>
                    </td>
                </tr>
            </>
        );
    }
}
const mapDispatchToProps = {
    onGetAllStaff,
    onDeleteStaff,
    onGetOneStaff,
};

export default connect(null, mapDispatchToProps)(Staff);
