import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { appConfig } from '../../../../constant';

//action
import { onGetAllHanghoa, onDeleteHanghoa, onSearchHanghoa } from '../../actions';

//component
import EditHanghoa from '../EditHangHoa';
import Hanghoa from '../HangHoa';

//assets
import './style.css';
import { thisExpression } from '@babel/types';


class ListHangHoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    componentDidMount() {
        this.getlistHanghoa();
    }

    componentDidUpdate() {}

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

    onChangeSearch = e => {
        this.setState({
            search: e.target.value,
        });
    };

    onShowHanghoa = () => {
        const { listhanghoa } = this.props;

        const { search = '' } = this.state;

        return listhanghoa.map((hanghoa, index) => {
            const { tenmh = '' } = hanghoa;

            if (tenmh.toLowerCase().indexOf(search.toLowerCase())>-1) {
                return <Hanghoa hanghoa={hanghoa} index={index} key={index} />;
            } else {
                return null;
                
            }
        });
    };

    render() {
        return (
            <div>
                <div>
                    <h2 style={{ margin: '20px 0 20px 0' }}>
                        <i className='fa fa-shopping-bag' style={{ marginRight: 10, color: '#00b3b3' }}></i>
                        Quản lý hàng hóa
                    </h2>
                    <EditHanghoa />
                    <form className='form-inline' style={{ marginBottom: '20px' }}>
                        <div className='form-group'>
                            <button type='button' className='btn btn-outline-secondary' data-toggle='modal' data-target='#myModal'>
                                <i className='fa fa-plus' aria-hidden='true' style={{ marginRight: '5px' }}></i>
                                Thêm Hàng hóa
                            </button>
                            <div className='input-group ' style={{ marginLeft: '20px', zIndex: '0' }}>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='search'
                                    placeholder='Tìm kiếm Theo Tên'
                                    onChange={this.onChangeSearch}
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
                                        <th className='cell100 column1' style={{ width: '50px' }}>
                                            STT
                                        </th>
                                        <th className='cell100 column2' style={{ width: '100px' }}>
                                            Mã mặt hàng
                                        </th>
                                        <th className='cell100 column3' style={{ width: '200px' }}>
                                            Tên mặt hàng
                                        </th>
                                        <th className='cell100 column4' style={{ width: '200px' }}>
                                            Loại mặt hàng
                                        </th>
                                        <th className='cell100 column5' style={{ width: '100px' }}>
                                            Đơn vị tính
                                        </th>
                                        <th className='cell100 column6' style={{ width: '100px' }}>
                                            Số Lượng
                                        </th>
                                        <th className='cell100 column7' style={{ width: '150px' }}>
                                            Đơn giá
                                        </th>
                                        <th className='cell100 column8' style={{ textAlign: 'center', width: '200px' }}>
                                            Hành Động
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className='table100-body js-pscroll table-staff'>
                            <table>
                                <tbody>{this.onShowHanghoa()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        listhanghoa: state.listHangHoa.listhanghoaReducer.listhanghoa,
        listhanghoa2: state.listHangHoa.listhanghoaReducer.listhanghoa2,
    };
}
const mapDispatchToProps = {
    onGetAllHanghoa,
    onDeleteHanghoa,
    onSearchHanghoa,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHangHoa);
