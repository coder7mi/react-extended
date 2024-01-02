export default {
  namespace: 'city', //命名空间
  state: {
    cityName: '北京',
    cityId: '110100',
  },

  reducers: {
    changeCity(preState: any, action: any) {
      console.log(action);
      return {
        ...preState,
        cityName: action.payload.cityName,
        cityId: action.payload.cityId,
      };
    },
  },
};
