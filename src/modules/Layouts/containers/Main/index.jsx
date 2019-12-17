// Libraries
import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Popover, Button } from 'antd';

//Component
import Header from '../Header/index';

//actions
import { onLogoutUser } from '../Login/actions';

// Routes
import routes from '../../../../routes';

//asets
import './style.css';

class Main extends Component {
    state = {
        visible: false,
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    onLogOut = () => {
        confirmAlert({
            title: 'Đăng xuất',
            message: 'Bạn Có chắc muốn đăng xuất !',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => {
                        localStorage.removeItem('userlogin');
                        this.props.onLogoutUser({
                            isAuth: false,
                            user: {},
                        });
                    },
                },
                {
                    label: 'Không',
                    onClick: () => null,
                },
            ],
        });
    };

    render() {
        return (
            <div className='wrapper-main'>
                <div className='side-bar' style={{ width: `${this.props.onToggleBar ? '22%' : '0%'}` }}>
                    <div className='background-color'>
                        QUẢN LÝ SIÊU THỊ
                        <hr />
                    </div>

                    <div className='content-sidebar'>
                        <img
                            className='avatar-home'
                            alt='avatar-home'
                            src='https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png'
                        />
                        <div className='name-home'>{this.props.user.nameUser}</div>
                        <ul className='list-group'>
                            <Link className='list-group-item item-list' to='/'>
                                DashBoard
                                <i className='fa fa-tachometer' aria-hidden='true' style={{ marginLeft: '10px' }}></i>
                            </Link>
                            <Popover
                                content={
                                    <>
                                        <div>{`Tên : ${this.props.user.nameUser}`}</div>
                                        <div>{`Email : ${this.props.user.email}`}</div>
                                        <a onClick={this.hide}>Close</a>
                                    </>
                                }
                                title='Thông tin người dùng'
                                trigger='click'
                                visible={this.state.visible}
                                placement='right'
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <span className='list-group-item item-list' style={{ cursor: 'pointer' }}>
                                    Thông tin người dùng
                                    <i className='fa fa-user' aria-hidden='true' style={{ marginLeft: '10px' }}></i>
                                </span>
                            </Popover>
                            <Popover placement='right' title='Version' content={<div>ver 0.0.1 /beta</div>} trigger='click'>
                                <span className='list-group-item item-list version' style={{ position: 'relative' }} to='/'>
                                    Version
                                    <i className='fas fa-code-branch    ' style={{ marginLeft: '10px' }}></i>
                                </span>
                            </Popover>
                            <Popover
                                placement='right'
                                title='About'
                                content={
                                    <div style={{display:'flex'}}>
                                        <div>
                                            Made by <br /> Nguyễn Lương Trường Vĩ <br /> Nguyễn Công Minh <br /> Nguyễn Thành Trung
                                        </div>
                                        <div style={{borderLeft:'1px solid grey',margin:'0px 10px',padding:'10px 10px'}}>
                                            Ứng dụng Quản lý siêu thị 
                                        </div>
                                    </div>
                                }
                                trigger='click'
                            >
                                <span className='list-group-item item-list'>
                                    About
                                    <i className='fa fa-braille' aria-hidden='true' style={{ marginLeft: '10px' }}></i>
                                </span>
                            </Popover>

                            <Link className='list-group-item item-list' to='/' onClick={this.onLogOut}>
                                LogOut
                                <i className='fas fa-sign-out-alt    ' style={{ marginLeft: '10px' }}></i>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className='main-content'>
                    <Header />
                    <div
                        className='container-fluid relative-layout'
                        style={{
                            width: `${this.props.onToggleBar ? '1100px' : '1350px'}`,
                            maxHeight: `${this.props.onToggleBar ? '90vh' : '20000px'}`,
                        }}
                    >
                        <Suspense
                            fallback={
                                <div className='progress'>
                                    <div
                                        className='progress-bar progress-bar-striped progress-bar-animated'
                                        role='progressbar'
                                        aria-valuenow='75'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{ width: '75%' }}
                                    ></div>
                                </div>
                            }
                        >
                            <Switch>
                                {routes.map((route, index) => {
                                    return route.component ? (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => <route.component {...props} />}
                                        />
                                    ) : null;
                                })}
                                <Redirect to={'/homepage'} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.Layouts.loginReducer.user,
        onToggleBar: state.Layouts.loginReducer.onToggle,
    };
}
const mapDispatchToProps = {
    onLogoutUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
