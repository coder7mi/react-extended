import React from 'react';
import { NavBar } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { history } from 'umi';

export default function Cinema() {
  return (
    <div>
      <NavBar
        back="北京"
        backArrow={false}
        right={<SearchOutline />}
        onBack={() => {
          console.log(1);
          history.push('/city');
        }}
      >
        标题
      </NavBar>
    </div>
  );
}
