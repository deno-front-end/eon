import TodoListForm from './TodoListForm.tsx';
import TodoListRow from './TodoListRow.tsx';
import type { Todo } from './TodoListRow.tsx';
import ThemeTodoList from './ThemeTodoList.ts';

export default function(this: VMC) {
  return (<template>
    <style>{/*css*/`
      h1 {
        color: ${this.ThemeTodoList.grey};
      }
      .container {
        display: table;
        background: white;
        margin: auto;
        width: 500px;
        height: 500px;
        border-radius: 3%;
        border: 1px solid ${this.ThemeTodoList.border};
      }
      .container > * {
        padding: 10px;
      }
      .todos {
        height: 500px;
        width: auto;
        overflow-y: auto;
        overflow-x: hidden;
        background: ${ThemeTodoList.lightGrey};
      }
    `}</style>
    <div class="container">
      <h1>Todo List App</h1>
      <div class="todos">
        {
          (todo, index, arr = this.list) => <TodoListRow todo={() => todo}>
            <div>
              {() => this.list.length.toString()}
            </div>
          </TodoListRow>
        }
      </div>
      <TodoListForm />
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
      //setTimeout(() => this.list.splice(0), 200);
    }, 2000);
  }
}