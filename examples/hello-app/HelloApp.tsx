export const name = "AppHello";
export default function(this: ViewModel) {
  return (
    <template>
      <div>{this.message}</div>
    </template>
  )
}
export class ViewModel {
  public message = "Hello World";
  static props(props: { name: string }) {
    return props
  }
}
