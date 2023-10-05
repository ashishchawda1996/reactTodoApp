import { Fragment } from "react"
import { useTodos } from "../../contexts/todo.context"
import { useSearchParams } from "react-router-dom"

import './todo-list.styles.css'

const TodoList = () => {
    const { todos, todoAsCompleted, handleDeleteTodo } = useTodos()
    const [ searchParams ] = useSearchParams()
    let navStatus = searchParams.get('todos')
    let filterTodos = todos;

    if (navStatus==='active') {
      filterTodos = filterTodos.filter((todo) => !todo.completed)
    }else if (navStatus==='completed') {
      filterTodos = filterTodos.filter((todo) => todo.completed)
    }
    

    const handleChange = (id:string) => {
        todoAsCompleted(id) 
    }

  return (
    <Fragment>
      <ul className="main-task">
        {
            filterTodos.map((todo) => {
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
