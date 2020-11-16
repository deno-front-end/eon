import ThemeTodoList from './ThemeTodoList.ts';

export interface Todo {
  value: string;
  active: boolean;
  issues: number[];
}
export type Props = EonProps<{ todo: Todo }>;
export default function(this: VMC, props: Props) {
  return (<template>
    <style>{/*css*/`
      .container {
        padding: 5px;
        border: 1px solid ${this.ThemeTodoList.border};
      }
      .container.active {
        background: ${this.ThemeTodoList.green};
      }
      .container.inactive {
        background: ${this.ThemeTodoList.inactive};
      }
    `}</style>
    <div class={() => `container ${this.todo.active ? 'active' : 'inactive'}`}>
      <div>
        <slot></slot>
        <span>
          {() => `${this.todo.active ? 'active' : 'inactive'}  `}
        </span>
        {() => this.todo.value}
      </div>
      <slot name="issues"></slot>
    </div>
  </template>)
}
export class VMC {
  ThemeTodoList = ThemeTodoList;
  todo: Todo = {
    value: 'default',
    active: true,
    issues: [],
  };
  static props(this: VMC, props: Props) {
    this.todo.value = (props.todo as Todo).value;
    this.todo.active = (props.todo as Todo).active;
  }
}