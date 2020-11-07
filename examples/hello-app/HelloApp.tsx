import { EonBinder } from '../../src/classes/EonBinder.ts';

interface Props {
  message: string;
};
export default function(this: VMC, props: EonBinder<Props>) {
  return (<template meta={import.meta}>
    <style>
      {`.container { color: red; }`}
    </style>
    <div class="container" onclick={this.switch}>
      {() => '> ' + Date.now()}
    </div>
  </template>)
}
export class VMC {
  public message = "Hello World";
  public switch() {
    this.message = 'test';
  }
  static props(prop: Props) {}
}