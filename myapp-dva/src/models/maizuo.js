export default {
  namespace: "maizuo",

  state: {
    isShow: true,
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 初始化
    },
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

  // 异步-redux-saga
};
