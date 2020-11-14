import TodoListForm from './TodoListForm.tsx';
import TodoListRow from './TodoListRow.tsx';
import type { Todo } from './TodoListRow.tsx';
import ThemeTodoList from './ThemeTodoList.ts';

export interface TodoListAppInterface {
  ThemeTodoList: typeof ThemeTodoList;
  list: Todo[];
}

export default function(this: TodoListAppInterface) {
  this.ThemeTodoList = ThemeTodoList;
  this.list = [
    {
      value: 'test',
      active: true,
      issues: [1, 2, 3]
    },
    {
      value: 'test2',
      active: false,
      issues: [0],
    },
  ];
  return (<template>
    <style>{/*css*/`
      h1 {
        font-family: 'Helvetica Neue', sans-serif;
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
      <div>
        todos {() => this.list.length},
        active {() => this.list.filter((c) => c.active).length},
        done {() => this.list.filter((c) => !c.active).length},
      </div>
      <div class="todos">
        {(todo: Todo, i: number, arr = this.list) =>
          <TodoListRow todo={() => todo}>
            <span>
              {() => i} {' - '}
            </span>
            <div slot="issues">
              {(issue: number, j, arr2 = todo.issues) => <div>
                  {() => issue.toString()}
                </div>
              }
            </div>
          </TodoListRow>
        }
      </div>
      <TodoListForm />
    </div>
  </template>)
}
export function connected(this: TodoListAppInterface) {
  setInterval(() => {
    this.ThemeTodoList.grey = 'red';
    this.list.push({
      active: Math.random() > 0.5,
      value: 'test3',
      issues: [],
    })
    setTimeout(() => this.list.splice(0), 200);
  }, 2000);
}