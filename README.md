# vue-barcode

[![Build Status](https://travis-ci.org/xkeshi/vue-barcode.svg)](https://travis-ci.org/xkeshi/vue-barcode) [![Downloads](https://img.shields.io/npm/dm/@xkeshi/vue-barcode.svg)](https://www.npmjs.com/package/@xkeshi/vue-barcode) [![Version](https://img.shields.io/npm/v/@xkeshi/vue-barcode.svg)](https://www.npmjs.com/package/@xkeshi/vue-barcode)

> Barcode component for [Vue.js](https://vuejs.org/), bases on [JsBarcode](https://github.com/lindell/JsBarcode).

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
├── vue-barcode.js        (UMD)
├── vue-barcode.min.js    (UMD, compressed)
├── vue-barcode.common.js (CommonJS)
└── vue-barcode.esm.js    (ES Module)
```

## Getting started

### Install

```shell
npm install @xkeshi/vue-barcode vue
```

In browser:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-barcode.js"></script>
```

### Usage

```js
import Vue from 'vue';
import VueBarcode from '@xkeshi/vue-barcode';

Vue.component(VueBarcode.name, VueBarcode);
```

```html
<barcode value="Hello, World!" :options="{ displayValue: false }"></barcode>
```

In browser:

```html
<script>Vue.component(VueBarcode.name, VueBarcode);</script>
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

[MIT](https://opensource.org/licenses/MIT) © [Xkeshi](http://xkeshi.com)

[⬆ back to top](#table-of-contents)
