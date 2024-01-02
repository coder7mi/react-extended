export default {
  namespace: 'cinema',
  state: {
    list: [],
  },

  reducers: {
    changeList(preState: any, action: any) {
      return {
        ...preState,
        list: action.payload,
      };
    },

    clearList(preState: any) {
      return {
        ...preState,
        list: [],
      };
    },
  },

  effects: {
    *getList(action: any, obj: any): any {
      const { put, call } = obj;
      const res = yield call(getListForCinema, action.payload.cityId);
      yield put({
        type: 'changeList',
        payload: res,
      });
    },
  },
};

const getListForCinema = async (cityId: any) => {
  const res = await fetch(
    `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=5043625`,
    {
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"17026203861815637294841857"}',
        'X-Host': 'mall.film-ticket.cinema.list',
      },
    },
  ).then((res) => res.json());
  return res.data.cinemas;
};
