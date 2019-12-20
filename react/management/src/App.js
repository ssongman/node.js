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
<Table>
<TableHead>
<TableRow>
<TableCell>번호</TableCell>
<TableCell>이미지</TableCell>
<TableCell>이름</TableCell>
<TableCell>생년월일</TableCell>
<TableCell>성별</TableCell>
<TableCell>직업</TableCell>
</TableRow>
</TableHead>
<TableBody>
{customers.map(c => {
return <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
})}
</TableBody>
</Table>
</div>
);
}
}

export default App;
