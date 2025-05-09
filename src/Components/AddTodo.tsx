import { ChangeEvent, FormEvent, useState } from "react";
import { defaultValue, TodoObject } from "../models/TodoObject"

export type AddTodoProps = {
    addTodo: (p: TodoObject) => void; 
}

export const AddTodo = (props: AddTodoProps) => {
    const [ todo, setAddTodo] = useState<TodoObject>(defaultValue); 

    const handleAction = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === "text") {
        setAddTodo({...todo, [e.target.id]: e.target.value })
        }

        if(e.target.type === "checkbox") {
            setAddTodo({...todo, [e.target.id]: e.target.value})
        }
    }

    const HandleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(!todo.todo.trim()) return;

        const newTodo = new TodoObject(Date.now(), todo.todo, false)

        //Spara todo i listan 
        props.addTodo(newTodo);

        setAddTodo(defaultValue);
    } 
    
    return<>
    <div className="flex m-3 w-[700px] justify-center">
        <form onSubmit={HandleSubmit}>
            {/* <label className="m-1 text-gray-800" htmlFor="todo" >Lägg till Todo:</label> */}
            <input className="p-1 border-1 rounded-md bg-white
 text-gray-800" type="text" placeholder="Lägg till uppgift" id="todo" value={todo.todo} onChange={handleAction}/>
            <button className="p-1 border-1 rounded-md m-1 bg-white
         text-gray-800" >Spara</button>
        </form>
    </div>
    </>

}