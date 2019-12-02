//libaries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

//asset
import '../Header/styles.css'

//action
import {onLoginUser,onLogoutUser} from '../Login/actions'

class Header extends Component {

    onLogOut=()=>{
        localStorage.removeItem('userlogin')
        this.props.onLogoutUser({
            isAuth : false,
            user: {}
        })
    }

    render() {
        
        const {user}=this.props

        return (
            <>
                <nav className='navbar navbar-expand-sm navbar-light bg-light' style={{position:'fixed',width: '100%',zIndex:'2'}}>
                    <Link className='navbar-brand' to={`/`}>
                        
                        Trang chủ
                    </Link>
                    <button
                        className='navbar-toggler d-lg-none'
                        type='button'
                        data-toggle='collapse'
                        data-target='#collapsibleNavId'
                        aria-controls='collapsibleNavId'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='collapsibleNavId'>
                        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className="fa fa-windows mr-10" aria-hidden="true"></i>
                                    Hệ Thống
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to='/'>
                                        Action 1
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Action 2
                                    </Link>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className="fas fa-notes-medical  mr-10  "></i>
                                    Lập phiếu
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to='/'>
                                        Phiếu mua hàng
                                    </Link>
                                    <div className='dropdown-divider'></div>
                                    <Link className='dropdown-item' to='/'>
                                        Thẻ Kho
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Phiếu đề nghị
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Phiếu xuất
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Phiếu giao ca
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Hóa đơn bán hàng
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Đơn đặt hàng
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Phiếu giao hàng
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Phiếu kiểm kê
                                    </Link>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className="fas fa-layer-group mr-10   "></i>
                                    Danh mục
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to={`/staff`}>
                                        <i className="fas fa-users mr-10   "></i>
                                        Danh mục nhân viên
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        <i className="fa fa-user-secret mr-10" ></i>
                                        Danh mục khách hàng
                                    </Link>
                                    <Link className='dropdown-item' to='/nhacungcap'>
                                        <i className="fas fa-cart-plus mr-10   "></i>
                                        Danh mục nhà cung cấp
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        <i className="fas fa-box-open mr-10   "></i>
                                        Danh mục Hàng hóa
                                    </Link>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className="fas fa-bug  mr-10  "></i>
                                    Báo cáo
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to='/'>
                                        Action 1
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Action 2
                                    </Link>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className="fas fa-search-plus mr-10   "></i>
                                    Tra cứu
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to='/'>
                                        Action 1
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Action 2
                                    </Link>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    Danh mục
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to='/'>
                                        Action 1
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Action 2
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        <form className='form-inline my-2 my-lg-0'>
                            <div className='user-info'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxtEWwcsyFT5fkynZw-jJtKGcLAr6dzD3sKRS7yOyBDHXu2KGxg&s' className='avatar' alt='avatar'></img >
                                <div className='user'>{user.nameUser.toUpperCase()}</div>
                            </div>
                            <button className='btn btn-outline-success my-2 my-sm-0' type='button' onClick={this.onLogOut}>
                                SignOut
                            </button>
                        </form>
                    </div>
                </nav>
            </>
        );
    }
}

const mapStateToProps =state=> {
return {
    user : state.Layouts.loginReducer.user
}
}

const mapDispatchToProps ={
    onLoginUser,
    onLogoutUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
