import ThemeTodoList from './ThemeTodoList.ts';

export interface Todo {
  value: string;
  active: boolean;
  issues: number[];
}
export interface TodoListRowInterface {
  ThemeTodoList: typeof ThemeTodoList;
  todo: Todo;
  props: Props;
}
export type Props = EonProps<{ todo: Todo }>;
export default function(this: TodoListRowInterface, props: Props) {
  this.ThemeTodoList = ThemeTodoList;
  this.todo = {
    value: 'default',
    active: true,
    issues: [],
  };
  this.props = props;
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