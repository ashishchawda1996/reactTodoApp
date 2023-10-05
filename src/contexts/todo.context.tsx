import { ReactNode, createContext, useState, useContext } from "react";

export type TodoProviderProps = {
    children: ReactNode;
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type todoContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    todoAsCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void

}

export const TodoContext = createContext<todoContext | null>(null)

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try{
            const newTodos = localStorage.getItem('todos') || '[]';
            return JSON.parse(newTodos) as Todo[]
        }catch (error){
            return []
        }
    })

    const getUniqueId = () => {
        let id = ''
        for (let index = 0; index < 6; index++) {
            id = id + (Math.floor(Math.random() * 10));

        }
        const todoList = Object.values(todos);

        if (todoList.length !== 0) {
            for (let todo of todoList) {
                if (todo.id === id) {
                    id = getUniqueId()
                    return id
                }
            }
        }
        return id
    };

    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: getUniqueId().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem('todos',JSON.stringify(newTodos))
            return newTodos
        })
    };

    const todoAsCompleted = (id: string) => {
        let newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            };
            return todo;
        });
        localStorage.setItem('todos',JSON.stringify(newTodos))
        setTodos(newTodos)
    }

    const handleDeleteTodo = (id: string) => {
        let newTodos = todos.filter((todo) => todo.id !== id)
        localStorage.setItem('todos',JSON.stringify(newTodos))
        setTodos(newTodos)
    }

    const value = {
        todos,
        handleAddTodo,
        todoAsCompleted,
        handleDeleteTodo,
    }

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
};


// consumer 
export const useTodos = () => {
    const todosConsumer = useContext(TodoContext);
    if (!todosConsumer) {
        throw new Error("useTodos used outside of Provider");
    }
    return todosConsumer;
}