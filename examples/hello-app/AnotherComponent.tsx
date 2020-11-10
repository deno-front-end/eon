// @ts-ignore
export type AnProps = EonProps<{ test: string; }>;
export default function (this: VMC, props: AnProps) {
  return (<template>
    <style>{`div { color: blue }`}</style>
    <div>
      test of props {() => this.test}
    </div>
  </template>)
}
export class VMC {
  public message = 'Hello World overwritten';
  public test: string = 'test';
  static props(this: VMC, props: AnProps) {
    this.test = props.test as string;
  }
  static updated(this: VMC) {
    this.message = 'Im updated';
  }
}