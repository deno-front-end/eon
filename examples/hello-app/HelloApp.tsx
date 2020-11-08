import AnotherComponent from "./AnotherComponent.tsx";

export default function (this: VMC, props: EonProps<{ message: string }>) {
  return (<template meta={import.meta}>
    <style>
      {`.container { color: red; }`}
    </style>
    <AnotherComponent message={() => ''}>
    </AnotherComponent>
    <div class="container" onclick={() => this.switchText()}>
      {() => '> ' + Date.now()}
    </div>
  </template>)
}
export class VMC {
  public message: string = "Hello World";
  public switchText() {
    this.message = 'test';
  }
}