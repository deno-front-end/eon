export const name = "component-a";
export default function(this: VMC) {
  return (<>
      <template>
        {() => this.message}
        <div> {() => this.message} </div>
        <div> {() => this.array[1]} </div>
      </template>
    </>
  )
}
export class VMC {
  message = "Hello World";
  array = [1, 3];
  static props(this: VMC, props: { message: string }) {
    this.message = props.message;
    return props
  }
}
