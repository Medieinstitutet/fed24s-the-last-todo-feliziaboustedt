import { TodoObject } from "../models/TodoObject"

export type ShowTodoProps= {
    todo: TodoObject;
    removeTodo: (id: number) => void;
    doneTodo: (id: number) => void;
};

export const ShowTodo = ({todo, removeTodo, doneTodo}: ShowTodoProps ) => {
    const doneTask = () => {
        doneTodo(todo.id)
    }
    console.log(todo)

    return <>
    <div className="m-3 grid grid-cols-[1fr_auto] items-center ">
    <p className="text-left text-gray-800">{todo.todo}</p>
    <span className="flex flex-row space-y-2">
    <span className="items-center"
    onClick={doneTask}
    style={{ cursor: "pointer", fontSize: "1.5rem" }}
    role="button"
    aria-label="Markera som klar"
    >
    {todo.isDone ? "✅" : "⬜"}
    </span>

{/* //funktionen nedanför fungerar på samma sätt som span bara en visuellt tråkigare lösning.. */}
{/* <input type="checkbox" onChange={doneTask} checked={todo.isDone} /> */}
    
    <button className="w-18 p-1 border-1 rounded-md bg-zinc-50
 text-gray-800 cursor-pointer" onClick={() => removeTodo(todo.id)}>Ta bort</button>
    </span>
    </div>
    </>
};