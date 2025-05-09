import { ShowTodo } from "./ShowTodo"
import { TodoObject } from "../models/TodoObject"

export type TodoProps = {
    todos: TodoObject[], 
    removeTodo: (id: number) => void, 
    doneTodo: (id:number) => void,
    doneTodos: TodoObject[],
    sortAsc: boolean, 
    useSort: () => void,
}

export const Todos = ({todos, removeTodo, doneTodo, doneTodos, sortAsc}: TodoProps) => {

    return <>
    <div className="grid grid-cols-2 gap-1 w-full justify-items-center ">
    <div className="border-1 rounded-md p-15 w-[650px] bg-white ">
    <header className="flex justify-center">
    <h1 className="font-extrabold text-3xl">Att göra:</h1>
    </header>
    <p className="italic">klicka på emojin om uppgiften är klar"⬜"</p>
    {[...todos]
        .sort((a, b) =>
          sortAsc
            ? a.todo.localeCompare(b.todo)
            : b.todo.localeCompare(a.todo)
        )
        .map(t => (
          <ShowTodo
            key={t.id}
            todo={t}
            removeTodo={removeTodo}
            doneTodo={doneTodo}
          />
        ))}
</div>
<div className="border-1 rounded-md p-15  w-[650px] bg-white">
<header className="flex justify-center">
        <h1 className="font-extrabold text-3xl">Färdiga uppgifter: </h1>
</header>
        <p className="italic">få tillbaka uppgiften till todo-listan genom att klicka bocken "✅"</p>
        {doneTodos.length === 0 ? (
  <p className="
 text-gray-800
">Inga färdiga uppgifter ännu.</p>
) : (
  doneTodos.map(t => (
    <ShowTodo
      key={t.id}
      todo={t}
      removeTodo={removeTodo}
      doneTodo={doneTodo}
    />
  ))
)}
</div>
</div>
    </>
}