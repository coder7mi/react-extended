import { getListApi } from "../services/maizuo";
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

    saveList(preState, { payload }) {
      return { ...preState, list: payload };
    },
  },

  // 异步-redux-saga
  effects: {
    *getList(action, { call, put }) {
      const res = yield call(getListApi);
      yield put({
        type: "saveList",
        payload: res.data.data.cinemas,
      });
    },
  },
};
