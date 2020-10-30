import HelloApp2 from './HelloApp2.jsx';

export default function AppHello(this: VMC): JSX.Element {
  // what to do about all the things referenced here
  // maybe it's a helper zone for SSR
  // but what about SPA
  // keep in mind, this function is just to do the dom tree
  return (<>
    <HelloApp2 onclick={this.switch}>
      {() => {}}
    </HelloApp2>
    <template test={() => this.message}>
      <div class="container" onclick={this.switch}>
        {() => this.message}
      </div>
    </template>
    <style>
      {`.container { color: red; }`}
    </style>
  </>
  )
}
export class VMC {
  public message = "Hello World";
  public switch() {
    this.message = 'test';
  }
}
