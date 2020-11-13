export interface TodoListFormInterface { value: string }
export default function(this: TodoListFormInterface) {
  this.value = '';
  return (<template>
    <form>
      <input value={() => this.value}></input>
      <button>Add</button>
    </form>
  </template>)
}
export function connected(this: TodoListFormInterface) {
  this.value = 'placeholder';
}