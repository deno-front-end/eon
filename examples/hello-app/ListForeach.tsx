export const name = "AppHello";
export default function(this: ViewModel, Directive: any) {
  return (<>
      <template>
        {
          new Directive.for(() => this.array.forEach((number: number) => <div>
            {number}
          </div>))
        }
      </template>
    </>
  )
}
export class ViewModel {
  public message = "Hello World";
  public array :number[] = [1, 3];
  static props(props: { name: string }) {
    return props
  }
}
