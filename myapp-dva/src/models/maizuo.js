export default {
  namespace: "maizuo",

  state: {
    isShow: true,
  },

  reducers: {
    hide(preState, action) {
      return {
        ...preState,
        isShow: false,
      };
    },

    show(preState, action) {
      return {
        ...preState,
        isShow: true,
      };
    },
  },
};
