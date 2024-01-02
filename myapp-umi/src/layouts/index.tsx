import React from 'react';
import { NavLink } from 'umi';
import './index.less';

export default function IndexLayout(props: any) {
  if (
    props.location.pathname === '/city' ||
    props.location.pathname.includes('/detail')
  ) {
    return <div>{props.children}</div>;
  }
  return (
    <div>
      {props.children}
      <ul>
        <li>
          <NavLink to="/film" activeClassName="active">
            电影
          </NavLink>
        </li>
        <li>
          <NavLink to="/cinema" activeClassName="active">
            影院
          </NavLink>
        </li>
        <li>
          <NavLink to="/center" activeClassName="active">
            我的
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
