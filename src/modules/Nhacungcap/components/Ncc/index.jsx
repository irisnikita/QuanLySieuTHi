//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import


//config
import { appConfig } from '../../../../constant';

//assets
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//action
import { onGetAllNcc, onDeleteNcc, onGetOneNcc } from '../../actions';
class Ncc extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onDeleteNcc = id => {
        confirmAlert({
            title: 'Xóa nhà cung cấp',
            message: `Bạn có muốn xóa nhà cung cấp ${this.props.ncc.tenncc} !`,
            buttons: [
                {
                    label: 'Có',
                    onClick: () => {
                        this.onDeleteNccRequest(id);
                    },
                },
                {
                    label: 'Không',
                    onClick: () => null,
                },
            ],
        });
    };

    onUpdateNcc = id => {
        this.props.onGetOneNcc({
            id: id,
        });
    };

    onDeleteNccRequest = async id => {
        const deleteNcc = await axios({
            method: 'DELETE',
            url: `${appConfig.API_URL}/listncc/${id}`,
            data: {},
        });
        if (deleteNcc) {
            this.props.onDeleteNcc({
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
                    <td className='cell100 column2' style={{ width: '200px' }}>
                        {ncc.id}
                    </td>
                    <td className='cell100 column3' style={{ width: '250px' }}>
                        {ncc.tenncc}
                    </td>
                    <td className='cell100 column4' style={{ width: '250px' }}>
                        {ncc.diachi}
                    </td>
                    <td className='cell100 column5' style={{ width: '250px' }}>
                        {ncc.sdt}
                    </td>
                    <td className='cell100 column6' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '261px' }}>
                        <button type='button' className='btn btn-secondary mr-20' onClick={() => this.onDeleteNcc(ncc.id)}>
                            <i className='far fa-trash-alt' style={{ margin: '0 5px' }}></i>
                            Xóa
                        </button>
                        <button
                            type='button'
                            className='btn btn-success mr-20'
                            onClick={() => this.onUpdateNcc(ncc.id)}
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
