export interface Todo {
  value: string;
  active: boolean;
}
export type Props = EonProps<{ todo: Todo }>;
export default function(this: VMC, props: Props) {
  return (<template>
    <div class={() => `container ${this.todo.active ? 'active' : ''}`}>
      <div class="state"></div>
      <slot></slot>
      <div>{() => this.todo.value}</div>
    </div>
  </template>)
}
export class VMC {
  todo: Todo = {
    value: 'default',
    active: true,
  };
  static props(this: VMC, props: Props) {
    this.todo = props.todo as Todo;
  }
}