import React, { Component } from 'react';

//component
import ListCustomer from './components/ListCustomer'

//asets
import './style.css'

class Customer extends Component {
    render() {
        return (
            <>
               <ListCustomer />
            </>
        );
    }
}

export default Customer;