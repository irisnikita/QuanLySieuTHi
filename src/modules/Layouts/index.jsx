// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';

 // Components
 import Main from './containers/Main';
 import Login from './containers/Login';

class Layouts extends Component {
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
        state: state.Layouts.isAuth
    }
};

export default connect(mapStateToProps)(Layouts);