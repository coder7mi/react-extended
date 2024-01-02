import React, { useEffect } from 'react';
import { NavBar, DotLoading } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { connect, history } from 'umi';

function Cinema(props: any) {
  console.log(props);
  useEffect(() => {
    if (props.list.length === 0) {
      props.dispatch({
        type: 'cinema/getList',
        payload: {
          cityId: props.cityId,
        },
      });
    } else {
      console.log('缓存');
    }
  }, []);
  return (
    <div>
      <NavBar
        back={props.cityName}
        backArrow={false}
        right={<SearchOutline />}
        onBack={() => {
          history.push('/city');
          props.dispatch({
            type: 'cinema/clearList',
          });
        }}
      >
        标题
      </NavBar>

      {props.loading && (
        <div style={{ color: '#00b578', textAlign: 'center' }}>
          <DotLoading color="currentColor" />
          <span>加载中</span>
        </div>
      )}

      <ul>
        {props.list.map((item: any) => {
          return <li key={item.cinemaId}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default connect((state: any) => {
  // console.log(state);
  return {
    cityName: state.city.cityName,
    cityId: state.city.cityId,
    list: state.cinema.list,
    loading: state.loading.global,
  };
})(Cinema);
