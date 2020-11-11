import DOMElement from './DOMElement.ts';
import type { EonModule } from './EonModule.ts';
import EonComponentRegistry from './EonComponentRegistry.ts';

export interface EonComponentInterface {
  /** uuid */
  uuid?: string;
  /** name */
  name?: string;
  /** path to the sandbox file of the component */
  file?: string;
  /** path to the sandbox file of the component */
  sandBoxPath?: string;
  /** path to the end user's component */
  sourcePath?: string;
  /** the DOM tree of the component */
  template?: DOMElement;
  /** component's VMC */
  VMC?: EonModule['VMC'];
  /** returns the DOM tree of the component */
  templateFactory: EonModule['default'];
  /** if the component is the first component */
  isRootComponent?: boolean;
  /** if the component is imported into the application */
  isImported?: boolean;
}
export default class EonComponent implements EonComponentInterface {
  uuid: EonComponentInterface['uuid'];
  name: EonComponentInterface['name'];
  file: EonComponentInterface['file'];
  sourcePath: EonComponentInterface['sourcePath'];
  sandBoxPath: EonComponentInterface['sandBoxPath'];
  template: EonComponentInterface['template'];
  VMC: EonComponentInterface['VMC'];
  isRootComponent: EonComponentInterface['isRootComponent'] = false;
  isImported: EonComponentInterface['isImported'] = false;
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
  /**
   * instead of using the name as component identifier (ex: component-name)
   * we will use a pseudo uuid (ex: data-a32dsfpi1)
   */
  get dataUuidForSPA(): string {
    if (this.uuid) {
      return `data-${this.uuid.split('-')[0]}`.toLowerCase();
    } else {
      return 'no-uuid';
    }
  }
}