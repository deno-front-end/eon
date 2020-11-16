export default function(this: VMC) {
  return (<template>
    <form>
      <input value={() => this.value}></input>
      <button>Add</button>
    </form>
  </template>)
}
export class VMC {
  value = '';
  static connected(this: VMC) {
    this.value = 'placeholder';
  }
}