import { FormEvent, ChangeEvent, useState } from 'react';
import { useTodos } from '../../contexts/todo.context';

import './add-task.styles.css'

const AddTask = () => {
    const [ todo, setTodo ] = useState('')
    const { todos,handleAddTodo } = useTodos()

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleAddTodo(todo)
      setTodo('')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const task = event.target.value;
        setTodo(task)
        
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='task' value={todo} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default AddTask
