import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';

const customer = {
  'name': 'Mr. Hong1',
  'birthday': '961222',
  'gender': 'Man',
  'job': 'High School'
}

class App extends Component {
  render() {
    return (
      <Customer
        name={customer.name}
        birthday={customer.birthday}
        gender={customer.gender}
        job={customer.job}
      />
    );
  }
}

export default App;
