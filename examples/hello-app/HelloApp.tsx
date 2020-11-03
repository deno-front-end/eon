export const name = "hello-app";
export default function(this: VMC) {
  // what to do about all the things referenced here
  // maybe it's a helper zone for SSR
  // but what about SPA
  // keep in mind, this function is just to do the dom tree
  return (<>
    <template test={() => this.message}>
      <style>
        {`.container { color: red; }`}
      </style>
      <component-a>
      </component-a>
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
