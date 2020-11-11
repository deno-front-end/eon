import TodoListForm from './TodoListForm.tsx';
import TodoList from './TodoList.tsx';
import type { Todo } from './TodoList.tsx';
import ThemeTodoList from './ThemeTodoList.ts';

export default function(this: VMC) {
  return (<template>
    <style>{/*css*/`
    .container {
      background: white;
      margin: auto;
      width: 500px;
      height: 500px;
      border-radius: 3%;
      padding: 10px;
      border: 1px solid ${ThemeTodoList.grey};
    }
    `}</style>
    <div class="container">
      <h1>Todo List App</h1>
      {(todo, index, arr = this.list) => <TodoList todo={() => todo}></TodoList>}
      <TodoListForm></TodoListForm>
    </div>
  </template>)
}
export class VMC {
  list: Todo[] = [
    {
      value: 'test',
      active: true
    },
  ]
}