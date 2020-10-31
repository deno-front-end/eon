import DOMElement from './DOMElement.ts';
import type { EonModule } from './ModuleGetter.ts';
import EonComponentRegistry from './EonComponentRegistry.ts';

export interface EonComponentInterface {
  /** uuid */
  uuid?: string;
  /** name */
  name?: string;
  /** path the component */
  file?: string;
  /** the DOM tree of the component */
  template?: DOMElement;
  /** component's VMC */
  VMC?: EonModule['VMC'];
  /** returns the DOM tree of the component */
  templateFactory: EonModule['default'];
  /** if the component is the first component */
  isRootComponent?: boolean;
}
export default class EonComponent implements EonComponentInterface {
  uuid: EonComponentInterface['uuid'];
  name: EonComponentInterface['name'];
  file: EonComponentInterface['file'];
  template: EonComponentInterface['template'];
  VMC: EonComponentInterface['VMC'];
  isRootComponent: EonComponentInterface['isRootComponent'] = false;
  templateFactory: EonComponentInterface['templateFactory'];
  constructor(opts: EonComponentInterface) {
    const {
      file,
      uuid,
      template,
      VMC,
      templateFactory,
      name
    } = opts;
    this.file = file;
    this.uuid = uuid;
    this.template = template;
    this.VMC = VMC;
    this.name = name;
    this.templateFactory = templateFactory;
    if (this.uuid) {
      EonComponentRegistry.subscribe(this.uuid, this);
    }
  }
}