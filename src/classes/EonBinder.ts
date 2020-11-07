export type EonBinder<T> = { children?: any } & {
  [P in keyof T]: (() => T[P]) | T[P];
}