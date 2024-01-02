import React from 'react';
import { Redirect, useLocation } from 'umi';

export default function Film(props: any) {
  if (
    props.location.pathname === '/film' ||
    props.location.pathname === '/film/'
  ) {
    return <Redirect to="/film/nowPlaying" />;
  }

  // const location = useLocation();
  // if (location.pathname === '/film') {
  //   return <Redirect to="/film/nowPlaying" />;
  // }
  return (
    <div>
      Film
      {props.children}
    </div>
  );
}
