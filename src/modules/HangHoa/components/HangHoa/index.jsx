//libaries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import numeral from 'numeral';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//config
import { appConfig } from '../../../../constant';

//action
import { onGetAllHanghoa, onDeleteHanghoa, onGetOneHanghoa } from '../../actions';
class Hanghoa extends Component {
    constructor(props){
        super(props);
        this.state={};
    }


    onDeleteHanghoa = (id) => {
        confirmAlert({
            title: 'Xóa hàng hóa',
            message: ` Bạn có muốn xóa ${this.props.hanghoa.tenmh} `,
            buttons: [
              {
                label: 'Có',
                onClick: () => {
                    this.onDeleteHanghoaRequest(id);
                }
              },
              {
                label: 'Không',
                onClick: () => null
              }
            ]
          })
        
    };

    onUpdateHanghoa = (id) => {
        this.props.onGetOneHanghoa({
            id:id,
        });
    };

    onDeleteHanghoaRequest = async (id) => {
        const deleteHanghoa = await axios({
            method: 'DELETE',
            url: `${appConfig.API_URL}/listhanghoa/${id}`,
            data: {},
        })
        if(deleteHanghoa){
            this.props.onDeleteHanghoa({
                id: id
            })
        }
    };

    render() {

        let { hanghoa, index } = this.props;
        const fortmart_dongia = numeral(hanghoa.dongia).format('000,000,000')
        return (
            <>
                <tr className='row100 body'>
                    <td className='cell100 column1' style={{ display: 'flex', width: '93px' }}>
                        {index}
                    </td>
                    <td className='cell100 column2' style={{ width: '118px' }}>
                        {hanghoa.id}
                    </td>
                    <td className='cell100 column3' style={{ width: '236px' }}>
                        {hanghoa.tenmh}
                    </td>
                    <td className='cell100 column4' style={{ width: '237px' }}>
                        {hanghoa.loaimh}
                    </td>
                    <td className='cell100 column5' style={{ width: '118px' }}>
                        {hanghoa.dvt}
                    </td>
                    <td className='cell100 column6' style={{ width: '118px' }}>{hanghoa.soluong}</td>
                    <td className='cell100 column7' style={{ width: '178px' }}>{`${fortmart_dongia} vnd`}</td>
                    <td className='cell100 column8' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '238px' }}>
                        <button type='button' className='btn btn-secondary mr-20' onClick={() => this.onDeleteHanghoa(hanghoa.id)}>
                            <i className='far fa-trash-alt' style={{ margin: '0 5px' }}></i>
                            Xóa
                        </button>
                        <button
                            type='button'
                            className='btn btn-success mr-20'
                            onClick={() => this.onUpdateHanghoa(hanghoa.id)}
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
    onGetAllHanghoa,
    onDeleteHanghoa,
    onGetOneHanghoa,
};

export default connect(null, mapDispatchToProps)(Hanghoa);
