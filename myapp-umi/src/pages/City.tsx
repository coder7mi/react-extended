import React, { useEffect, useState } from 'react';
import { IndexBar, List } from 'antd-mobile';
import { history, connect } from 'umi';

function City(props: any) {
  const [list, setList] = useState<any>([]);

  /* ---------------------------------- 过滤城市 ---------------------------------- */
  const filterCity = (cityList: any) => {
    // 获取A-Z字母
    const letterArr: Array<string> = [];
    for (let i = 65; i < 91; i++) {
      letterArr.push(String.fromCharCode(i));
    }

    // 过滤首字母城市
    const newList = [];
    for (let m in letterArr) {
      const cityItems: any = cityList.filter(
        (item: any) =>
          item.pinyin.substring(0, 1).toUpperCase() === letterArr[m],
      );

      cityItems.length &&
        newList.push({
          title: letterArr[m],
          items: cityItems,
        });
    }
    console.log(newList);
    return newList;
  };

  /* ---------------------------------- 点击城市 ---------------------------------- */
  const changeCity = (item: any) => {
    console.log(item.name, item.cityId);
    props.dispatch({
      type: 'city/changeCity',
      payload: {
        cityName: item.name,
        cityId: item.cityId,
      },
    });

    history.push('/cinema');
  };

  useEffect(() => {
    fetch('https://m.maizuo.com/gateway?k=9871703', {
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"17026203861815637294841857"}',
        'X-Host': 'mall.film-ticket.city.list',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setList(filterCity(res.data.cities));
      });
  }, []);

  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {list.map((item: any) => {
          const { title, items } = item;
          return (
            <IndexBar.Panel index={title} title={title} key={title}>
              <List>
                {items.map((item: any, index: number) => (
                  <List.Item key={index} onClick={() => changeCity(item)}>
                    {item.name}
                  </List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          );
        })}
      </IndexBar>
    </div>
  );
}

export default connect(() => ({}))(City);
