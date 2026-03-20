import './App.css';
import TodoList from './TodoList';
import Clock from './Clock';
import MyWeather from './MyWheather';

function App() {
  return (
    <div className="container">
      <TodoList/>
      <MyWeather weather="맑음">일기 예보</MyWeather>
      <Clock/>
    </div>
  );
}

export default App;
