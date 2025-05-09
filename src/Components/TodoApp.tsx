import { useState } from "react"
import { TodoObject } from "../models/TodoObject"
import { Todos } from "./Todos"
import { AddTodo } from "./AddTodo"

export const TodoApp = () => {
    const [todos, setTodos] = useState<TodoObject[]>(() => {
        const stored = localStorage.getItem("todos"); 
        return stored ? JSON.parse(stored) : 
    [
        { id: 1, todo: "städa", isDone: false},
        { id: 2, todo: "laga mat", isDone: false}
    ]})
    const [doneList, setDoneList] = useState<TodoObject[]>(() => {
        const stored = localStorage.getItem("doneList"); 
        return stored ? JSON.parse(stored) :
    [
        { id: 3, todo: "träna", isDone: true}
    ]});

    const [sortAsc, setSortAsc] = useState(true);
    const useSort = () => setSortAsc(!sortAsc);

    const removeTodo = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id));
        setDoneList(doneList.filter((t) => t.id !== id));
    }

    const addTodo = (newTodo: TodoObject) => {
        const updatedTodos = [
            ...todos, 
            new TodoObject(newTodo.id, newTodo.todo, newTodo.isDone),
        ];
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    const doneTodo =(id:number) => {
           
        const fromTodoList = todos.find((t) => t.id === id);
        const foundInDone = doneList.find((t) => t.id === id);

    if (fromTodoList) {
        const updated = new TodoObject(fromTodoList.id, fromTodoList.todo, true);

        const newTodos = todos.filter((t) => t.id !== id)
        const newDonelist = [... doneList, updated];
        setTodos(newTodos)

        // setTodos(todos.filter(todos => todos.id !== id))
        // setDoneList(todos => [...todos, new TodoObject(fromTodoList.id, fromTodoList.todo, true)])
        setDoneList(newDonelist)
        localStorage.setItem("todos", JSON.stringify(newTodos));
        localStorage.setItem("doneList", JSON.stringify(newDonelist));
    } else if (foundInDone) {
        const updated = new TodoObject(foundInDone.id, foundInDone.todo, false);
       
        const newDonelist = doneList.filter((t) => t.id !== id)
        const newTodos = [... todos, updated]

        setDoneList(newDonelist); 
        setTodos(newTodos);
        // setDoneList(doneList.filter(t => t.id !== id));
        // setTodos([...todos, updated])
        localStorage.setItem("todos", JSON.stringify(newTodos)); 
        localStorage.setItem("doneList", JSON.stringify(newDonelist)); 
    }
}
    // useEffect(() => {
    //     localStorage.setItem("todos", JSON.stringify(todos))
    // }, [todos])

    // useEffect(() => {
    //     localStorage.setItem("doneList", JSON.stringify(doneList))
    // }, [doneList])
    // console.log("doneList", doneList)

    return <>
    <header className="flex justify-center items-center h-50">
    <h1 className="font-bold text-6xl">My Todos 📝</h1>
    </header>
    <AddTodo addTodo={addTodo}/>
    <div className="flex w-[700px] justify-center m-3.5">
    <button className="p-1 border-1 rounded-md m-1 bg-white
 text-gray-800" onClick={() => setSortAsc(!sortAsc)}>Sortera: {sortAsc ? "Ö-A" : "A-Ö"}</button>
    </div>
    <Todos todos={todos} doneTodos={doneList} removeTodo={removeTodo} doneTodo={doneTodo} useSort={useSort} sortAsc={sortAsc}/>
    </>
}