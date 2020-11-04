export const name = "component-a";
export default function(this: VMC) {
  return (<>
      <template>
        <style>
        {`.container { color: blue; }`}
        </style>
        {() => this.message}
        <div class="container"> {() => this.message} </div>
        <div> {() => this.array[1]} </div>
        {/*for*/(number: number, i: number, array = this.complexArray) =>
          <div>
            {() => number}
          </div>
        }
      </template>
    </>
  )
}
export class VMC {
  message = "Hello World 2";
  array = [1, 3];
  complexArray = [1, 3, 2, 9, 0, 6];
  static props(this: VMC, props: { message: string }) {
    this.message = props.message;
    return props
  }
}
