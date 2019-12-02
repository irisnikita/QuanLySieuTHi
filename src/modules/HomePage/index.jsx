import React, { Component } from 'react';
import { connect } from 'react-redux';

//asset
import './style.css';

//action
import { onLoginUser } from '../Layouts/containers/Login/actions';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userlogin: {},
        };
        this.chartRef = React.createRef();
    }

    chartReference = {}

    componentDidMount(){
        console.log(this.chartReference);
    }

    componentDidUpdate() {}

    render() {
        let { userlogin = {} } = this.props;

        return (
            <>
            <h1>{userlogin.nameUser}</h1>
                <p>{userlogin.email ? `${userlogin.email}` : 'No email'}</p>
                <span>Hello </span>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userlogin: state.Layouts.loginReducer.user,
    };
};

const mapDispatchToProps = {
    onLoginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
