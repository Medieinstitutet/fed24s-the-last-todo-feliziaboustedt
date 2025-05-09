export class TodoObject {
  constructor(public id: number, public todo: string, public isDone: boolean) {}
}

export const defaultValue: TodoObject = {
  id: 0,
  todo: "",
  isDone: false,
};
