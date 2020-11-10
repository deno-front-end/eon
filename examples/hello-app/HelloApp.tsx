import AnotherComponent, { VMC as AnVMC } from "./AnotherComponent.tsx";
export default function (this: VMC, props: EonReactiveProps<{ message: string }>) {
  return (<template>
    <style>{
      `.container {
          color: red;
        }
      `}</style>
    {() => this.array.length}
    <div class="container">
      {() => this.message}
      {() => this.newData.test.message}
      <span class="span">
        {() => '> ' + Date.now()}
      </span>
    </div>
  </template>)
}


export class VMC extends AnVMC {
  public message: string = "Hello World";
  public array: number[] = [0];
  public newData = {
    test: {
      message: 'string'
    }
  };

  static connected(this: VMC) {
    let i = 0;
    setInterval(() => {
      this.newData.test.message = `${i} test deep reactivity`;
      i++;
    }, 50);
    console.warn(this.newData.test);
  }

  public switchText() {
    this.message = 'test';
  }
}