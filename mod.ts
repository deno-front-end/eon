import { ModuleGetter } from './src/classes/ModuleGetter.ts';
import ModuleResolver from './src/classes/ModuleResolver.ts';
import './src/functions/jsxFactory.ts';

const opts = {
  entrypoint: './examples/hello-app/HelloApp.tsx',
};
const module = await ModuleGetter.buildModule(opts);
const component = await ModuleResolver.resolve(module, opts);

console.warn(component);
