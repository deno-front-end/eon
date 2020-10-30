export default function AppHello() {
  return (<>
      <template>
        {() => this.message}
        <div> {() => this.message} </div>
        <div> {() => this.array[1]} </div>
        <for let={(number) => <div>{ number }</div>}/>
      </template>
    </>
  )
}
export class VMC {
  message = "Hello World";
  array = [1, 3];
  static props(props) {
    return props
  }
}
