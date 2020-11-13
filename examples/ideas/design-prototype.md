```tsx
import TodoListRow, { Todo } from '../todo-list/TodoListRow.tsx';

export interface DesignPrototypeProps { message: string }
export interface DesignPrototype {
  list: Todo[];
  props: DesignPrototypeProps
}

export function connected(this: DesignPrototype) {
  this.list.push({
    active: false,
    value: 'test from design-prototype',
    issues: [],
  });
}

export default function(this: DesignPrototype, props: DesignPrototypeProps) {
  this.list = [];
  this.props = props;
  return (<template>
    {() => this.props.message}
    {(todo: Todo, i: number, arr: Todo[] = this.list) =>
      <TodoListRow todo={() => todo}>
        <span>
          {() => `${i}  -  `}
        </span>
      </TodoListRow>
    }
  </template>)
}
```