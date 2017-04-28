# vue-barcode

> Barcode component for [Vue.js](https://vuejs.org/). It is based on [JsBarcode](https://github.com/lindell/JsBarcode).



## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Props](#props)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)



## Main

```
dist/
├── vue-barcode.js        (63 KB, UMD)
├── vue-barcode.min.js    (29 KB, UMD, compressed)
├── vue-barcode.common.js (63 KB, CommonJS)
└── vue-barcode.esm.js    (63 KB, ES Module)
```



## Getting started


### Download

- [Download the latest release](https://github.com/xkeshi/vue-barcode/archive/master.zip).
- Clone the repository: `git clone https://github.com/xkeshi/vue-barcode.git`.
- Install with [NPM](https://npmjs.com): `npm install xkeshi/vue-barcode`.


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

[MIT](http://opensource.org/licenses/MIT) © [xkeshi](http://xkeshi.com)

[⬆ back to top](#table-of-contents)
