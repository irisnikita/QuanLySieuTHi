//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {axios} from 'axios'

//config
import { appConfig } from '../../../../constant';

//action
import { onGetAllNcc, onDeleteNcc, onGetOneNcc } from '../../actions';

class Ncc extends Component {
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

        let { ncc, index } = this.props;
        return (
            <>
                <tr className='row100 body'>
                    <td className='cell100 column1' style={{ display: 'flex', width: '79px' }}>
                        {index}
                    </td>
                    <td className='cell100 column2' style={{ width: '140px' }}>
                        {ncc.id}
                    </td>
                    <td className='cell100 column3' style={{ width: '197px' }}>
                        {ncc.tenncc}
                    </td>
                    <td className='cell100 column4' style={{ width: '197px' }}>
                        {ncc.diachi}
                    </td>
                    <td className='cell100 column5'>{ncc.sdt}</td>
                    <td className='cell100 column8' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '261px' }}>
                        <button type='button' className='btn btn-secondary mr-20' onClick={() => this.onDelete(ncc.id)}>
                            <i className='far fa-trash-alt' style={{ margin: '0 5px' }}></i>
                            Xóa
                        </button>
                        <button
                            type='button'
                            className='btn btn-success mr-20'
                            onClick={() => this.onUpdate(ncc.id)}
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
    onGetAllNcc,
    onDeleteNcc,
    onGetOneNcc,
};

export default connect(null, mapDispatchToProps)(Ncc);
