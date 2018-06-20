const { Vue, VueBarcode } = window;

Vue.component(VueBarcode.name, VueBarcode);

describe('<barcode>', () => {
  it('tag', () => {
    const vm = new Vue({
      template: '<barcode tag="img" value="1"></barcode>',
    }).$mount();

    expect(vm.$el.tagName.toLowerCase()).to.equal('img');
  });

  it('options', (done) => {
    const vm = new Vue({
      template: '<barcode value="1" :options="{ displayValue: false, height: 200, margin: 0 }"></barcode>',
    }).$mount();

    setTimeout(() => {
      expect(vm.$el.height).to.equal(200);
      done();
    }, 500);
  });

  it('value', (done) => {
    const vm = new Vue({
      template: '<barcode value="1" :options="{ displayValue: false }"></barcode>',
    }).$mount();

    setTimeout(() => {
      expect(vm.$el.toDataURL()).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAB4CAYAAAAqs3YmAAADg0lEQVR4Xu3cwXLCMAwE0Ob/P5rOkIZiJUaye2g883oD0mBWlry7crw9Ho/Hl79lEdgEcNnYPQcugGvHTwAXj58ACuDqCCw+fmugAC6OwOLDl4ECuDgCiw+/nIHbtjU/9TBwjvejodN7P+KV/X+8vvc9x3VxXPH943X8Pdl11ftW7x9/dw/fbH4JYEAom4hVoLMJIoA/wGeVIcusaobLwE4tUEL3XkI1s09LUNXMzmZ6Vnp6tVwABfAjuVJCi2uNDGxrDBITZEs1k6pkIwM4yoHqfcmITsYL4DWLoAPpwN2hsQZaAxsERtcoVlpiutGBY3otm4CstKK8qZKf7DoslJXWcAUZKAN3D5UX2paGjE1XTWdrICcmoZX7xzKQkCfkr1JFCVVCldB3BLLNUHRgeMzQrrR2F1/P6hs1CGJaIjFIDBKDxHxoR0VwsrWsWpIylnh876zlld1/9r5KaMeCQ2KQmKF+pgxkZrPSrsgHMztkRnYMjZ3ZY51+JAaJ2RHwfGCLwykzEi8XiUFikBgk5u25toy99XojSAwS08wNVlonVWzsHcsUXqiOvI68jvwbAkqoEnpZErDQsYnBSmOlsdI+ra2xk9/bUcBKY6Wx0lhprLTT2QBK6CTJOIBjpbHSGgRmyQYrjZXGSmOlsdJe53hW11YkBol5IpDt5ntNFIcctEtNtrPAIQdhaWZmM7NtqajwVf3AsUyhA+nASl45J6bX7olygIxILLrsydvodfb0VhXorMQJ4E8JzPQMFjq2tsY8cEpFQIQODE6KDLw2Cma7HDJw0qqrrq280EmANXQT1UHIj5GNjOUqoZ1MrZa6DGAygoy4rGm9R9OrXQ4kZnKNrWY2EjMJMBKDxDwRIOQJ+ScCGUnCQrHQfaLYE3NtdZERZAQZcYVA1jes0v1sjZKBMlAGysBE2yExZ4DoQDqQDqwI4Z7niMR0yq5+oH7g5dSwK21sYmgnTXY7qqVZO2kSYO0k7STtpPc50FvbTjW849iMWl0yUAbKQBn4i0BWQTR0NXQ1dEfMcjIicXiyPl8kKay0HQFbKsLE0o3QjdCN0I1wUtNpX+Zf11gkBolpjAI6kA7EQulAh56vc+h54nX7+J8QKAv5fxqfr826RNWHWyB5TwRk4D3jUh6VAJahuueFAnjPuJRHJYBlqO55oQDeMy7lUQlgGap7XiiA94xLeVTfwlobmDJl618AAAAASUVORK5CYII=');
      done();
    }, 500);
  });
});
