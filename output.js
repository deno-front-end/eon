
  function h() {}
  export const name = "AppHello";
export default function () {
    return (h("template", null,
        h("div", null, this.message)));
}
export class ViewModel {
    constructor() {
        this.message = "Hello World";
    }
    static props(props) {
        return props;
    }
}

