import AddTask from './components/add-task/add-task.component';

import './App.css';
import TodoList from './components/todo-list/todo-list.component';
import Navbar from './components/navbar/navbar.component';

function App() {
  return (
    <div className='main'>
      <h1>REACT TODO APPLICATION</h1>
      <AddTask />
      <Navbar />
      <TodoList />
    </div>
  );
}

export default App;
