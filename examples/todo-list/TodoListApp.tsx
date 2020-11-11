import TodoListForm from './TodoListForm.tsx';
import TodoList from './TodoList.tsx';
import type { Todo } from './TodoList.tsx';
import ThemeTodoList from './ThemeTodoList.ts';

export default function(this: VMC) {
  return (<template>
    <style>{`
      h1 {
        color: ${this.ThemeTodoList.grey};
      }
      .container {
        background: white;
        margin: auto;
        width: 500px;
        height: 500px;
        border-radius: 3%;
        padding: 10px;
        border: 1px solid ${this.ThemeTodoList.grey};
      }
    `}</style>
    <div class="container">
      <h1>Todo List App</h1>
      {(todo, index, arr = this.list) => <TodoList todo={() => todo}>
          <div>
            test slot
          </div>
        </TodoList>}
      <TodoListForm></TodoListForm>
    </div>
  </template>)
}
export class VMC {
  ThemeTodoList = ThemeTodoList;
  list: Todo[] = [
    {
      value: 'test',
      active: true
    },
    {
      value: 'test2',
      active: false
    },
  ];
  static connected(this: VMC) {
    setInterval(() => {
      this.ThemeTodoList.grey = 'red';
      this.list.push({
        active: false,
        value: 'test3',
      })
      setTimeout(() => this.list.splice(0), 200);
    }, 2000);
  }
}