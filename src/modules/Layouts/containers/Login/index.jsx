// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// Actions
import { onLoginUser, onLoginSuccess } from './actions';

// Assets
import {appConfig} from '../../../../constant';
import './style.css';

class Login extends Component {
    state = {
        nameUser: '',
        passwordUser: '',
    };

    onChange = event => {
        let { target = {} } = event;
        let { name = '' } = target;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value,
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.authUser();
    };

    authUser = async () => {
        const {nameUser = ''} = this.state;

        const getUserInfo = await axios({
            method: 'GET',
            url: `${appConfig.API_URL}/userlogin/${nameUser}`,
            data: {
                
            }
        })

        if (getUserInfo) {
            this.props.onLoginUser({
                isAuth: true
            })
            
            // if (getUserInfo.data.passwordUser === this.state.passwordUser) {
            //     // localStorage.setItem('userlogin',JSON.stringify(getUserInfo.data))

            // } else {
            //     alert('Bạn đã nhập sai mật khẩu');
            // }
        }
    }

    render() {
        return (
            <div className='container-fluid background'>
                <div className='row'>
                    <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                        <div className='card card-signin my-5'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'>Đăng nhập</h5>
                                <form className='form-signin' onSubmit={this.onSubmit}>
                                    <div className='form-label-group'>
                                        <input
                                            type='text'
                                            id='inputEmail'
                                            className='form-control'
                                            placeholder='Email address'
                                            name='nameUser'
                                            value={this.state.nameUser}
                                            onChange={this.onChange}
                                            required
                                            autoFocus
                                        />
                                        <label htmlFor='inputEmail'>Tên đăng nhập</label>
                                    </div>

                                    <div className='form-label-group'>
                                        <input
                                            type='password'
                                            id='inputPassword'
                                            className='form-control'
                                            placeholder='Password'
                                            name='passwordUser'
                                            value={this.state.passwordUser}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <label htmlFor='inputPassword'>Mật Khẩu</label>
                                    </div>

                                    <div className='custom-control custom-checkbox mb-3'>
                                        <input type='checkbox' className='custom-control-input' id='customCheck1' />
                                        <label className='custom-control-label' htmlFor='customCheck1'>
                                            Nhớ mật khẩu
                                        </label>
                                    </div>
                                    <button className='btn btn-lg btn-primary btn-block text-uppercase' type='submit'>
                                        Sign in
                                    </button>
                                    <hr className='my-4' />
                                    <button className='btn btn-lg btn-google btn-block text-uppercase' type='submit'>
                                        <i className='fab fa-google mr-2'></i> Sign in with Google
                                    </button>
                                    <button className='btn btn-lg btn-facebook btn-block text-uppercase' type='submit'>
                                        <i className='fab fa-facebook-f mr-2'></i> Sign in with Facebook
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.Layouts.loginReducer.user,
    };
};

const mapDispatchToProps = {
    onLoginUser,
    onLoginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
