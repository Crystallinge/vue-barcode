window.addEventListener('DOMContentLoaded', function () {
  var Vue = window.Vue;
  var VueBarcode = window.VueBarcode;

  Vue.component('barcode', VueBarcode);

  new Vue({
    el: '#app',
  });
});
