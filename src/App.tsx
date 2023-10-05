import AddTask from './components/add-task/add-task.component';

import './App.css';
import TodoList from './components/todo-list/todo-list.component';

function App() {
  return (
    <div className='main'>
      <h1>REACT TODO APPLICATION</h1>
      <AddTask />
      <TodoList />
    </div>
  );
}

export default App;
