# vue-barcode

> Barcode component for [Vue.js](https://vuejs.org/). It is based on [JsBarcode](https://github.com/lindell/JsBarcode).

- [Website](https://xkeshi.github.io/vue-barcode)

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Props](#props)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)

## Main

```text
dist/
├── vue-barcode.js        (71 KB, UMD)
├── vue-barcode.min.js    (32 KB, UMD, compressed)
├── vue-barcode.common.js (71 KB, CommonJS)
└── vue-barcode.esm.js    (71 KB, ES Module)
```

## Getting started

### Install

```bash
npm install @xkeshi/vue-barcode --save-dev
```

### Usage

- Browser: `window.VueBarcode`
- CommonJS: `var VueBarcode = require('vue-barcode')`
- ES2015: `import VueBarcode from 'vue-barcode'`

```js
Vue.component('barcode', VueBarcode);
```

```html
<barcode value="Hello, World!" :options="{ displayValue: false }"></barcode>
```

[⬆ back to top](#table-of-contents)

## Props

### value

- Type: `String`

The value of the barcode.

### options

- Type: `Object`

The options for the barcode generator. References the [JsBarcode's options](https://github.com/lindell/JsBarcode#options).

### tag

- Type: `String`
- Default: `'canvas'`
- Options: `'canvas'`, `'svg'` and `'img'`

The tag of the component root element.

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).

## License

[MIT](http://opensource.org/licenses/MIT) © [Xkeshi](http://xkeshi.com)

[⬆ back to top](#table-of-contents)
