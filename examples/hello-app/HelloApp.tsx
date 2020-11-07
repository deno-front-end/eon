import AnotherComponent from "./AnotherComponent.tsx";

interface Props {
  message: string;
  complex: typeof AnotherComponent;
};
export default function (this: VMC, props: EonProps<Props>) {
  props.message((value) => {
    this.message = value
  });
  props.complex((v) => {
    this.switch(v)
  })
  return (<template meta={import.meta}>
    <style>
      {`.container { color: red; }`}
    </style>
    <AnotherComponent message={() => ''}>
    </AnotherComponent>
    <div class="container" onclick={this.switch}>
      {() => '> ' + Date.now()}
    </div>
  </template>)
}
export class VMC {
  public message: string = "Hello World";
  public switch() {
    this.message = 'test';
  }
}