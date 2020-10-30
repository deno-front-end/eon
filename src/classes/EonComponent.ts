import DOMElement from './DOMElement.ts';
import type { EonModule } from './ModuleGetter.ts';

export interface EonComponentInterface {
  /** uuid */
  uuid?: string;
  /** name */
  name?: string;
  /** path the component */
  file?: string;
  /** the DOM tree of the component */
  template?: DOMElement;
  /** component's ViewModel */
  ViewModel?: EonModule['ViewModel'];
}
export default class EonComponent implements EonComponentInterface {
  uuid: EonComponentInterface['uuid'];
  name: EonComponentInterface['name'];
  file: EonComponentInterface['file'];
  template: EonComponentInterface['template'];
  ViewModel: EonComponentInterface['ViewModel'];
  constructor(opts: EonComponentInterface) {
    const {
      file,
      uuid,
      template,
      ViewModel,
    } = opts;
    this.file = file;
    this.uuid = uuid;
    this.template = template;
    this.ViewModel = ViewModel;
  }
}