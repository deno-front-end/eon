export const name = "hello-app";
export default function(this: VMC) {
  return (<>
    <template test={() => this.message}>
      <style>
        {`.container { color: red; }`}
      </style>
      <component-a></component-a>
      <div class="container" onclick={this.switch}>
        {() => this.message}
      </div>
    </template>
  </>
  )
}
export class VMC {
  public message = "Hello World";
  public switch() {
    this.message = 'test';
  }
  static props(this: VMC, props: { message: string }): boolean {
    this.message = props.message;
    return true;
  }
}
