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
      template: '<barcode value="1" :options="{ height: 200 }"></barcode>',
    }).$mount();

    setTimeout(() => {
      expect(vm.$el.height).to.above(200);
      done();
    }, 500);
  });

  it('value', (done) => {
    const vm = new Vue({
      template: '<barcode value="1"></barcode>',
    }).$mount();

    setTimeout(() => {
      expect(vm.$el.toDataURL()).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAACOCAYAAADpeIwiAAAEzklEQVR4Xu2cMY7yMBCFTUFBzwmoOQCIq3ACoFiJq1BwAYSEKLgHBQ0VB0BQ0CA6kFgtWfiJiZlx/ixxom+7Zb2Jec8zfvPGSeV6vV4NP4VFoAKBheXuNnEILDZ/EFhw/iAQAouOQMHnzx4IgQVHoODTJwIhsOAIFHz66gisVCqxr3o3cO6f24aO63MbL+n/7fGu+9zH2fOyP7//bn8faZz2utrr29/bha+0viDQQkhaiFqgpQUCgb/AS5lBiixthBOBjlxACo16CdrIftmCtGa2tNKl1OPK5RAIgW/FFSlUudcQgfEcg4ixyhZtJGnFhgSwXQ5or0sZ4Yh4CExWEdSB1IGRQ8MeyB4YQ8B3j8JKE0w36kC/ek1agFhpyvJGK36kcahQrLSYViACicDIQ8ULjacGSU1rTWf2QJwYQVZGfyYCKeQp5JNChRRKCiWFPiMgHYaiDrQeM+RUWvwUn8vq8zUI7LBExCBiEDGImDftKBscaS/TpiRJJd7vm9bykq6f9rqkUIcFh4hBxHj1M4lAzGystCTxgZltRYb0GhpOZvt1+hExiJgIAZ4PjOPwEhmCl4uIQcQgYhAxT8+1SerN1RtBxCBiYmsDK80RKhzs9YsUvFA68nTk6cg/IUAKJYUmpgRUqN/CwErDSsNKe7e32p1814kCrDSsNKw0rDSstJd3A5BCU4qMO3BYaVhpMQTSig2sNKw0rDSsNKy0x3s8tXsrIgYRc0NAOs33WCi85CC+1UgnC3jJgbU1Y2ZjZnOkQqNX6Qf6RQp1IHWgJq54T4yr3WOXA5QRgkUnPXlre52ueksLtJTiIPA3BUr1DCrUb2+144C3VFiIUAdaTgoRmGwUpO1yEIEprTrt3ooXmhJgGrpC1UEh7yc2JJVLCnVEqjbVSQBTRlBGJOY016Pp2i4HIiblHquNbERMSoARMYiYGwIU8hTyNwQkkYQKRYVGC4UzMclWF2UEZQRlRBICUt9QK/elPYoIJAKJQCJQqO0QMa8AUQdSB1IHagphl+eIiHGkXfqB9AMTlwan0vwWBu2klN0ObWqmnZQSYNpJtJNoJz2vAdfe9pLDHY6Nr9VFBBKBRCAR+A8BKYPQ0KWhS0PXxyynjBAcHqnPZ4sUrLQIAY5UWAuLbgTdCLoRdCN4U9PLucz/3WMRMYiYmFFAHUgdiAqlDuSl58V56bngdfPnnBBQF/I5zY/bSl0i7cMtIBkmAkRgmLyoZwWBaqjCHAiBYfKinhUEqqEKcyAEhsmLelYQqIYqzIGlJPB4PJrVamVms5lpt9um2+2GiX4GsyoVgT8tn16vZ8bj8QOa0Whk+v1+BlCFeYnSEbhYLEy9XjetVsvM53Oz3W7NcDgME/0MZlUqAm08JpOJ2e12EJjBQsnlEhCYC+zZ3RQCs8MylytBYC6wZ3dTCMwOy1yuBIG5wJ7dTSEwOyxzudJ0OjWHw8EMBoNc7v+Jm5auDtxsNuZ0OplqtWp+CNzv9+br68tcLpfbZ81m8xO4fuwepSLwfD6bTqdjlstlIoCNRsOs12tTq9U+BvBf36hUBP41WCFeHwJDZMVjThDoAVaIQyEwRFY85gSBHmCFOBQCQ2TFY04Q6AFWiEMhMERWPOYEgR5ghTgUAkNkxWNO397G2Vbfp8NEAAAAAElFTkSuQmCC');
      done();
    }, 500);
  });
});
