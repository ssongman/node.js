import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';

const customer = [
{
  'id': 1,
  'image': 'https://placeimg.com/64/64/any',
  'name': 'Mr. Hong',
  'birthday': '961222',
  'gender': 'Man',
  'job': 'High School'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/any',
  'name': 'Mr. Song',
  'birthday': '961223',
  'gender': 'Man',
  'job': 'High School'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/any',
  'name': 'Mr. Park',
  'birthday': '961224',
  'gender': 'Woman',
  'job': 'High School'
}
]

class App extends Component {
  render() {
    return (
      <div>
      <Customer
        id      ={customer[0].id}
        image   ={customer[0].image}
        name    ={customer[0].name}
        birthday={customer[0].birthday}
        gender  ={customer[0].gender}
        job     ={customer[0].job}
      />
      <Customer
        id      ={customer[1].id}
        image   ={customer[1].image}
        name    ={customer[1].name}
        birthday={customer[1].birthday}
        gender  ={customer[1].gender}
        job     ={customer[1].job}
      />
      <Customer
        id      ={customer[2].id}
        image   ={customer[2].image}
        name    ={customer[2].name}
        birthday={customer[2].birthday}
        gender  ={customer[2].gender}
        job     ={customer[2].job}
      />
      </div>
    );
  }
}

export default App;
