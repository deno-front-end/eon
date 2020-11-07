export const name = "hello-app";
export default function(this: VMC) {
  return (<>
    <template>
      <style>
        {`.container { color: red; }`}
      </style>
      <component-a {...{
          title: () => this.message
        }}/>
      <div class="container" onclick={this.switch}>
        {() => '> ' + Date.now()}
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
  static props(this: VMC, props: { message: string; }) {
    this.message = props.message;
  }
}
