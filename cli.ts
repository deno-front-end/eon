import DenoFFCLI from './src/classes/DenoFFCLI.ts';

if (import.meta.main) {
  const { args } = Deno;
  DenoFFCLI.readArgs(args);
}