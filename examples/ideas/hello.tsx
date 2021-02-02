export type Props = { name: string };
export default function(this: Eon<{ message: string; list: string[] }>, props: Props) {
  define:
    this.message = 'Hello World';
    this.list = [];
  return <template { ...{ for: this.list } }>
    { this.message }
  </template>
}