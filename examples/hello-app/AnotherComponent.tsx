export default function (this: VMC, props: EonProps<{ message: string }>) {
  return (<template useVMC={VMC} meta={import.meta}>
      {(number, i, arr = this.array) =>
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