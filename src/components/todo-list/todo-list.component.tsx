import { Fragment } from "react"
import { useTodos } from "../../contexts/todo.context"

import './todo-list.styles.css'

const TodoList = () => {
    const { todos, todoAsCompleted, handleDeleteTodo } = useTodos()

    const handleChange = (id:string) => {
        todoAsCompleted(id) 
    }
  return (
    <Fragment>
      <ul className="main-task">
        {
            todos.map((todo) => {
                const date = new Date(todo.createdAt)
                return <li key={todo.id}>
                        <input type="checkbox" id={`task-${todo.id}`} onChange={event=>handleChange(todo.id)} checked={todo.completed} />
                        <label htmlFor={`task-${todo.id}`}>{todo.task}</label>
                        <label htmlFor={`task-${todo.id}`}>{date.toDateString()}</label>
                        {
                            todo.completed && (
                                <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            )
                            
                        }
                </li>
            })
        }

      </ul>
    </Fragment>
  )
}

export default TodoList
