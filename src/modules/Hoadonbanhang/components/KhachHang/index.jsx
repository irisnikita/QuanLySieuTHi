//libaries
import React, { Component } from 'react';
import _ from 'lodash';

class KhachHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tenkh: '',
            diachi: '',
            sdt: '',
            iskhtt: false,
        };
    }

    onChange = e => {
        let { value = '', name = '' } = e.target;
        this.setState({
            [name]: value,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        const { id, tenkh, diachi, sdt } = this.state;
        const { Customers } = this.props;
        if (id !== prevState.id || tenkh !== prevState.tenkh || diachi !== prevState.diachi || sdt !== prevState.sdt) {
            this.onSaveKhachHang();
        }
        if (id !== prevState.id) {
           var filter =_.filter(Customers,item=>item.id.toString()===id.toString())
           if(filter.length>0){
               this.setState({
                tenkh: filter[0].tenkh,
                diachi: filter[0].diachi,
                sdt: filter[0].sdt,
                iskhtt: true,
               })
           }
           else{
               this.setState({
                tenkh: '',
                diachi: '',
                sdt: '',
                iskhtt: false,
               })
           }
        }
    }

    onSaveKhachHang = () => {
        const { tenkh, diachi, sdt, iskhtt } = this.state;
        const id = parseInt(this.state.id);
        this.props.onSaveKhachHang({ id, tenkh, diachi, sdt, iskhtt });
    };

    render() {
        const { id = 0, tenkh = '', diachi = '', sdt = '' } = this.state;

        return (
            <>
                <div className='infor-customer'>
                    <span style={{ fontSize: '20px', fontWeight: '500', textDecoration: 'underline' }}>Thông tin khách hàng:</span>
                    <div style={{ margin: '10px 0px 0px 5px', display: 'flex' }}>
                        <div style={{ display: 'flex' }}>
                            <span style={{ fontWeight: 'bold' }}>Mã số khách hàng:</span>
                            <input
                                type='number'
                                name='id'
                                onChange={this.onChange}
                                value={id}
                                style={{ borderBottom: '1px solid black', width: 100, marginLeft: 5 }}
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <span style={{ fontWeight: 'bold' }}>Địa chỉ:</span>
                            <input
                                type='text'
                                name='diachi'
                                onChange={this.onChange}
                                value={diachi}
                                style={{ borderBottom: '1px solid black', marginLeft: 5, width: 400 }}
                            />
                        </div>
                        <div className='khachhang-thanthiet'></div>
                    </div>
                    <div style={{ margin: '10px 0px 0px 5px', display: 'flex' }}>
                        <div style={{ display: 'flex' }}>
                            <span style={{ fontWeight: 'bold' }}>Tên khách hàng:</span>
                            <input
                                type='text'
                                name='tenkh'
                                onChange={this.onChange}
                                value={tenkh}
                                style={{ borderBottom: '1px solid black', width: 300, marginLeft: 5 }}
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <span style={{ fontWeight: 'bold' }}>Số điện thoại:</span>
                            <input
                                type='text'
                                name='sdt'
                                onChange={this.onChange}
                                value={sdt}
                                style={{ borderBottom: '1px solid black', marginLeft: 5 }}
                            />
                        </div>
                    </div>
                    <div className='hoten-sdt'></div>
                </div>
            </>
        );
    }
}

export default KhachHang;
