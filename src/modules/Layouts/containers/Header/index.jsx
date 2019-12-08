//libaries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//asset
import '../Header/styles.css';

//action
import { onLoginUser, onLogoutUser, onToggleBar } from '../Login/actions';

class Header extends Component {
    onLogOut = () => {
        localStorage.removeItem('userlogin');
        this.props.onLogoutUser({
            isAuth: false,
            user: {},
        });
    };

    ontogglebar=()=>{
        this.props.onToggleBar()
    }

    render() {
        const { user } = this.props;

        return (
            <>
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark position-fixed'>
                    
                    <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.ontogglebar} style={{marginRight:'20px'}}>
                
                <i className={`${this.props.onToggle?"fas fa-align-right":"fa fa-align-left"}`}></i>
                <span>Menu</span>
            </button>
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
                            <li className='nav-item'>
                                <Link
                                    className='nav-link  btn-danger' style={{borderRadius:'5px',margin:'0 20px 0px 0px',color:'#fff',fontWeight:'600', fontSize:'15px'}}
                                    to='/'
                                >
                                    TRANG CHỦ
                                </Link>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle btn btn-outline-secondary'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className='fas fa-notes-medical  mr-10  '></i>
                                    Lập phiếu
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item' to='/phieumuahang'>
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
                                    <Link className='dropdown-item' to='/hoadonbanhang'>
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
                                    className='nav-link dropdown-toggle btn btn-outline-secondary '
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className='fas fa-layer-group mr-10   '></i>
                                    Danh mục
                                </Link>
                                <div className='dropdown-menu' aria-labelledby='dropdownId'>
                                    <Link className='dropdown-item ' to={`/staff`}>
                                        <i className='fas fa-users mr-10   '></i>
                                        Danh mục nhân viên
                                    </Link>
                                    <Link className='dropdown-item' to='/customer'>
                                        <i className='fa fa-user-secret mr-10'></i>
                                        Danh mục khách hàng
                                    </Link>
                                    <Link className='dropdown-item' to='/nhacungcap'>
                                        <i className='fas fa-cart-plus mr-10   '></i>
                                        Danh mục nhà cung cấp
                                    </Link>
                                    <Link className='dropdown-item' to='/hanghoa'>
                                        <i className='fas fa-box-open mr-10   '></i>
                                        Danh mục Hàng hóa
                                    </Link>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle btn btn-outline-secondary'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className='fas fa-bug  mr-10  '></i>
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
                                    className='nav-link dropdown-toggle btn btn-outline-secondary'
                                    to='/'
                                    id='dropdownId'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className='fas fa-search-plus mr-10   '></i>
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
                                    className='nav-link dropdown-toggle btn btn-outline-secondary'
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
                                <img
                                    src='https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png'
                                    className='avatar'
                                    alt='avatar'
                                ></img>
                                <div className='user'>{user.nameUser.toUpperCase()}</div>
                                <div className='dropdown-user'>
                                    <span className='avatar-user'>
                                        <img
                                            src='https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png'
                                            alt='avatar-big'
                                            className='avatar-big'
                                        />
                                    </span>
                                    <span className='name-user'>{user.nameUser.toUpperCase()}</span>
                                </div>
                            </div>
                            <button className='btn btn-outline-light btn-hover' type='button' onClick={this.onLogOut}>
                                SignOut
                            </button>
                        </form>
                    </div>
                </nav>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.Layouts.loginReducer.user,
        onToggle: state.Layouts.loginReducer.onToggle
    };
};

const mapDispatchToProps = {
    onLoginUser,
    onLogoutUser,
    onToggleBar
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
