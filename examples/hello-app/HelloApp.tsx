import * as HelloApp2 from './HelloApp2.jsx';
import * as HelloApp3 from './HelloApp2.jsx';
import * as HelloApp4 from './HelloApp2.jsx';

export const name = "AppHello";
export default function(this: ViewModel): JSX.Element {
  // what to do about all the things referenced here
  // maybe it's a helper zone for SSR
  // but what about SPA
  // keep in mind, this function is just to do the dom tree
  return (<>
    <template>
      <div class="container">{() => this.message}</div>
    </template>
    <style>
      {`.container { color: red; }`}
    </style>
  </>
  )
}
export class ViewModel {
  public message = "Hello World";
}
