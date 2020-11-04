import { parse } from "https://x.nest.land/swc@0.0.6/mod.ts";

const ast = parse(`/*for*/(number: number, i: number, array = this.complexArray) => {}`,{
  syntax: "typescript"
});
// @ts-ignore
console.warn(ast.body[0].expression.params);