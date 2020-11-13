import AnotherComponent from "./AnotherComponent.tsx";
export interface HelloAppInterface {
  array: number[];
  message: string;
  newData: any;
}
export function connected(this: HelloAppInterface) {
  let i = 0;
  setInterval(() => {
    this.newData.test.message = `${i} test deep reactivity`;
    i++;
  }, 50);
}
export default function (this: HelloAppInterface) {
  this.array = [];
  this.message = 'Hello world';
  this.newData = {
    test: {
      message: 'string'
    }
  };
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