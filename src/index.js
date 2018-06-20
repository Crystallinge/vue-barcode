import JsBarcode from 'jsbarcode/src/JsBarcode';

export default {
  name: 'barcode',

  props: {
    /**
     * The options for the bar code generator.
     * {@link https://github.com/lindell/JsBarcode#options}
     */
    options: Object,

    /**
     * The tag of the component root element.
     */
    tag: {
      type: String,
      default: 'canvas',
    },

    /**
     * The value of the bar code.
     */
    value: {
      type: null,
      default: '',
    },
  },

  render(createElement) {
    return createElement(this.tag, this.$slots.default);
  },

  watch: {
    /**
     * Update bar code when value change.
     */
    value() {
      this.generate();
    },

    /**
     * Update bar code when options change.
     */
    options() {
      this.generate();
    },
  },

  methods: {
    /**
     * Generate bar code.
     */
    generate() {
      if (this.$el) {
        JsBarcode(this.$el, String(this.value), this.options);
      }
    },
  },

  mounted() {
    this.generate();
  },
};
