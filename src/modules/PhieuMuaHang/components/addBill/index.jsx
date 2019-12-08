import React, { Component } from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import axios from 'axios'
import {appConfig} from '../../../../constant'

//actions
import { onAddRowBill,onTongCong } from '../../actions';
import {onAddHanghoa} from '../../../HangHoa/actions'

var var_thanhtien = 0;
var var_dongia = 0;
var var_soluong = 0;

class AddRowBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tenmh: '',
            dvt: '',
            dongia: 0,
            soluong: 0,
            thanhtien: 0,
        };
    }

    onSubmit = () => {
        const { id, tenmh, dvt, dongia, soluong, thanhtien } = this.state;
        if (id === 0 || tenmh === '' || dvt === '' || dongia === 0 || soluong === 0 || thanhtien === 0) {
            alert('Bạn nhập chưa đủ thông tin ! Mời nhập lại');
        } else {
            let Rowbill = {
                id,
                tenmh,
                dvt,
                dongia,
                soluong,
                thanhtien,
            };

            this.props.onTongCong({
                tongcong: this.props.tongcong+thanhtien
            })

            this.addHanghoaRequest();

            console.log(Rowbill);
            this.props.onAddRowBill(Rowbill);
            this.setState({
                id: 0,
                tenmh: '',
                dvt: '',
                dongia: 0,
                soluong: 0,
                thanhtien: 0,
            });
            var_thanhtien=0;
            var_soluong=0
            var_dongia=0
        }
    };

    addHanghoaRequest = async () => {
        const { id, tenmh, loaimh, dvt,soluong,dongia } = this.state;

        let newHanghoa = {
            id: parseInt(id),
            tenmh,
            loaimh,
            dvt,
            soluong: parseInt(soluong),
            dongia: parseInt(dongia)
        };
        const addHanghoa = await axios({
            method: 'POST',
            url: `${appConfig.API_URL}/listhanghoa/`,
            data: newHanghoa,
        });
        if (addHanghoa) {
            if (addHanghoa.data.code === 'ER_DUP_ENTRY') {
                alert('Bạn nhập trùng mã nhà cung cấp');
            } else {
                this.props.onAddHanghoa({
                    hanghoa: {
                        id: addHanghoa.data.id,
                        tenmh: addHanghoa.data.tenmh,
                        loaimh: addHanghoa.data.loaimh,
                        dvt: addHanghoa.data.dvt,
                        soluong: addHanghoa.data.soluong,
                        dongia: addHanghoa.data.dongia,
                    },
                });
            }
        }
    };

    onChange = e => {
        let { name } = e.target;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        if (e.target.name === 'dongia') {
            var_dongia = e.target.value;
        }
        if (e.target.name === 'soluong') {
            var_soluong = e.target.value;
        }

        this.setState({
            [name]: value,
        });
        if (!Number.isNaN(parseInt(this.state.dongia) * parseInt(this.state.soluong))) {
            var_thanhtien = var_dongia * var_soluong;
            this.setState({
                thanhtien: var_thanhtien,
            });
        }
    };

    render() {
        let { id, tenmh, dvt, dongia, soluong } = this.state;
        let fmt_thanhtien = numeral(var_thanhtien).format('0,0');
        return (
            <>
                <tr className='row100 body'>
                    <td className='cell100' style={{ width: '100px', padding: '0 0 0 10px' }}>
                        STT
                    </td>
                    <td className='cell100' style={{ width: '128px' }}>
                        <input
                            type='text'
                            name='id'
                            value={id}
                            placeholder='Nhập mã số'
                            style={{ width: '118px', fontFamily: 'Arial' }}
                            onChange={this.onChange}
                        />
                    </td>
                    <td className='cell100 ' style={{ width: '177px' }}>
                        <input
                            type='text'
                            name='tenmh'
                            value={tenmh}
                            placeholder='Nhập tên hàng'
                            style={{ width: '118px', fontFamily: 'Arial' }}
                            onChange={this.onChange}
                        />
                    </td>
                    <td className='cell100 ' style={{ width: '202px' }}>
                        <input
                            type='text'
                            name='dvt'
                            value={dvt}
                            placeholder='Nhập đơn vị tính'
                            style={{ width: '118px', fontFamily: 'Arial' }}
                            onChange={this.onChange}
                        />
                    </td>
                    <td className='cell100' style={{ width: '157px' }}>
                        <input
                            type='number'
                            name='dongia'
                            value={dongia}
                            placeholder='Nhập đơn giá'
                            style={{ width: '118px', fontFamily: 'Arial' }}
                            onChange={this.onChange}
                        />
                    </td>
                    <td className='cell100' style={{ width: '180px' }}>
                        <input
                            type='number'
                            name='soluong'
                            value={soluong}
                            placeholder='Nhập số lượng'
                            style={{ width: '118px', fontFamily: 'Arial' }}
                            onChange={this.onChange}
                        />
                    </td>
                    <td className='cell100' style={{ width: '197px' }}>
                        <input
                            type='number'
                            placeholder={`${fmt_thanhtien} vnd`}
                            readOnly
                            style={{ width: '118px', fontFamily: 'Arial' }}
                            onChange={this.onChange}
                        />
                    </td>
                    <td className='cell100' style={{ width: '179px' }}>
                        <button type='button' className='btn btn-secondary' onClick={this.onSubmit}>
                            Thêm
                        </button>
                    </td>
                </tr>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        tongcong: state.RowBillBuy.billBuyReducer.tongcong
    };
}

const mapDispatchToProps = {
    onAddRowBill,
    onTongCong,
    onAddHanghoa
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRowBill);
