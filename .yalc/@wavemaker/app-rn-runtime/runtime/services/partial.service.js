import injector from '@wavemaker/app-rn-runtime/core/injector';
export class PartialServiceImpl {
  constructor() {
    let partials = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    this.partials = partials;
  }
  get(partialName) {
    if (!this.partials) {
      this.partials = injector.get('APP_CONFIG').partials;
    }
    const partial = this.partials.find(p => p.name === partialName);
    return partial === null || partial === void 0 ? void 0 : partial.component;
  }
}
export default new PartialServiceImpl();
//# sourceMappingURL=partial.service.js.map