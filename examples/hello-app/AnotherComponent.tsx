// @ts-ignore
export default function (this: VMC, props: EonReactiveProps<{ message: string; test: string; map: Map<string, string> }>) {
  return (<template>
  </template>)
}
export class VMC {
  public message = 'Hello World overwritten';
  static updated(this: VMC) {
    this.message = 'Im updated';
  }
}