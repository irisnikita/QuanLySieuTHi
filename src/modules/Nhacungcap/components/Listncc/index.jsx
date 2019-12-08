import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { appConfig } from '../../../../constant';


//action
import { onGetAllNcc, onDeleteNcc,onSearchNcc } from '../../actions';


//component
import Editncc from '../Editncc';
import Ncc from '../Ncc'

//assets
import '../../../Staff/components/liststaff/style.css'

class Listncc extends Component {
    constructor(props) {
        super(props);
        this.state={
            search:''
        }
    }
    
    

    componentDidMount() {
        this.getlistncc();
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    handleChangeRowsPerPage = event => {
        this.setRowsPerPage(+event.target.value);
        this.setPage(0);
    };

    componentDidUpdate() {}

    


    getlistncc = async () => {
        const getlistncc = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/listncc/`,
            data: {},
        });

        if (getlistncc) {
            this.props.onGetAllNcc({
                listncc: getlistncc.data,
            });
        }
    };

    onChangeSearch=(e)=>{
        this.setState({
            search: e.target.value
        })
    }

    onShowNcc = () => {

        const { listncc } = this.props;
        const { search = ''}=this.state;
        
        return listncc.map((ncc,index)=>{
                const {tenncc = ''}=ncc;
                if(tenncc.toLowerCase().indexOf(search.toLowerCase())>-1){
                    return <Ncc ncc={ncc} index={index} key={index} />
                }
                else{
                    return null
                }
                
            })
        
    
    };

    render() {
        return (
            <div>
                <div>
                    <h2 style={{ margin: '20px 0 20px 0' }}>
                        
                    <i className="fas fa-store" style={{marginRight:10,color:'#00b3b3'}}></i>
                        Quản lý nhà cung cấp</h2>
                    <Editncc />
                    <form className='form-inline' style={{ marginBottom: '20px' }}>
                        <div className='form-group'>
                            <button type='button' className='btn btn-outline-secondary' data-toggle='modal' data-target='#myModal'>
                                <i className='fa fa-plus' aria-hidden='true' style={{ marginRight: '5px' }}></i>
                                Thêm nhà cung cấp
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
                                            Mã nhà cung cấp
                                        </th>
                                        <th className='cell100 column3' style={{ width: '250px' }}>
                                            Tên nhà cung cấp
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
                                <tbody>{this.onShowNcc()}</tbody>
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
        listncc: state.listncc.listnccReducer.listncc,
        listncc2: state.listncc.listnccReducer.listncc2
    };
};
const mapDispatchToProps = {
    onGetAllNcc,
    onDeleteNcc,
    onSearchNcc
};


export default connect(mapStateToProps,mapDispatchToProps)(Listncc);
