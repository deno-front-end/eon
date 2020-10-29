import { ModuleGetter } from './src/classes/ModuleGetter.ts';

const component = await ModuleGetter.buildModule({
  entrypoint: './examples/hello-app/HelloApp.tsx',
});

console.warn(component);
