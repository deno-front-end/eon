const entrypoint = './examples/hello-app/HelloApp.tsx';
const file = Deno.readTextFileSync(entrypoint);
console.warn({
    [entrypoint]: file,
});
/**@ts-ignore  */
const mod = await Deno.compile(entrypoint, undefined, {
    jsxFactory: "h",
    jsxFragmentFactory: "hf",
    types: ['./types.d.ts'],
    sourceMap: false,
    lib: ['dom'],
  });
console.warn(mod);
const transpiled = mod[1]['file:///home/rudy/Documents/Perso/deno-first-framework/examples/hello-app/HelloApp.js'];
Deno.writeTextFileSync('./output.js', `
  function h() {}
  ${transpiled}
`);
const module = await import('./output.js');
console.warn(transpiled);
// transform it into a module
console.warn(module)
// create the instance
const instance = new module.ViewModel();
// create the Proxy
const proxyVM = new Proxy(instance, {
  get(obj, key) {
    console.warn(key, obj)
  }
})
// put the proxy here
console.warn(module.default.bind(proxyVM)());
console.warn();