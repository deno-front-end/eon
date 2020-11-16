import AnotherComponent, { VMC as AnVMC } from "./AnotherComponent.tsx";
export default function (this: VMC) {
  return (<template>
    <style>{
      /*css*/`.container {
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
      <span class={() => this.newData.test.message}>
        test on reactive attributes
      </span>
    </div>
    <AnotherComponent test={() => this.newData.test.message} />
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
  }

  public switchText() {
    this.message = 'test';
  }
}