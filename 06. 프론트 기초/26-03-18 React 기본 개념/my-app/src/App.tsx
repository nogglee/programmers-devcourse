import logo from './logo.svg';
import './App.css';

{/* 
  작성자: nogglee
  작성일: 26-03-18
  내용: 해당 컴포넌트는 ..
*/}

function App() {
  let name = 'react'
  const style = {
    color: 'red',
    backgroundColor: 'black'
  }

  return (
    <div className="container">
      <h1 className='test'>Hello,
        { name === 'react' ? (<h1>Yes</h1>) : null } !!
      </h1>
      
    </div>
  );
}

export default App;
