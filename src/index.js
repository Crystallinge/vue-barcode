import JsBarcode from 'jsbarcode/src/JsBarcode';

export default {
  props: {
    /*
     * The value of the barcode.
     */
    value: {
      type: [String, Number],
      required: true,
    },

    /*
     * The options for the barcode generator.
     * {@link https://github.com/lindell/JsBarcode#options}
     */
    options: {
      type: Object,
    },

    /*
     * The tag of the component root element.
     */
    tag: {
      type: String,
      default: 'canvas',
    },
  },

  render(createElement) {
    return createElement(this.tag, this.$slots.default);
  },

  watch: {
    /*
     * Update barcode when value change
     */
    value() {
      this.generate();
    },

    /*
     * Update barcode when options change
     */
    options() {
      this.generate();
    },
  },

  mounted() {
    this.generate();
  },

  methods: {
    /**
     * Generate barcode
     */
    generate() {
      JsBarcode(this.$el, this.value, this.options);
    },
  },
};
