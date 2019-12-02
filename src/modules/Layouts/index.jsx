// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';

 // Components
 import Main from './containers/Main';
 import Login from './containers/Login';
 
 
 //action
import {onLoginUser} from '../Layouts/containers/Login/actions'


class Layouts extends Component {
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('userlogin'))

        if(JSON.parse(localStorage.getItem('userlogin'))!==null){
            this.setState({
                userlogin: JSON.parse(localStorage.getItem('userlogin'))
            })
            this.props.onLoginUser({
                isAuth:true,
                user: user
            })
        }
    }

    render() {
        const {isAuth = false} = this.props;

        return (
            <>
                {
                    isAuth ? (<Main />) : (<Login />)
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.Layouts.loginReducer.isAuth
    }
};

const mapDispatchToProps= {
    onLoginUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Layouts);