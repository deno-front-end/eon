export default function (this: VMC, props: EonReactiveProps<{ message: string; test: string; map: Map<string, string> }>) {
  return (<template useVMC={VMC} meta={import.meta}>
   {(/*for*/number, i, arr = this.array) =>
        <div>
          {() => `Hello ${number} ${i}`}
        </div>
      }
  </template>)
}
export class VMC {
  message: string = '';
  // @ts-ignore
  array: number[] = Array.from(new Array(2000));
}