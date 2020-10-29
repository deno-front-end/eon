export const name = "AppHello";
export default function() {
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
export class ViewModel {
  message = "Hello World";
  array = [1, 3];
  static props(props) {
    return props
  }
}
