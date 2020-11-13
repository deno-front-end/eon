export interface AnotherComponentInterface {
  message: string;
  test: string;
  props: AnProps;
}
// @ts-ignore
export type AnProps = EonProps<{ test: string; }>;
export function updated(this: AnotherComponentInterface) {
  this.message = 'Im Updated';
}
export default function (this: AnotherComponentInterface, props: AnProps) {
  this.message = 'Hello';
  this.test = 'test';
  this.props = props;
  return (<template>
    <style>{/*css*/`div { color: blue }`}</style>
    <div>
      test of props {() => this.props.test}
    </div>
  </template>)
}