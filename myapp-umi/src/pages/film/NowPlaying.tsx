import React, { useEffect, useState } from 'react';
import { useHistory, history } from 'umi';

export default function NowPlaying() {
  const [list, setList] = useState([]);
  // const history = useHistory();
  console.log(history);

  useEffect(() => {
    fetch(
      'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=5960505',
      {
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"17026203861815637294841857","bc":"110100"}',
          'X-Host': 'mall.film-ticket.film.list',
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setList(res.data.films);
      });
  }, []);
  return (
    <div>
      {list.map((item: any) => (
        <li
          key={item.filmId}
          onClick={() => {
            history.push(`/detail/${item.filmId}`);
          }}
        >
          {item.name}
        </li>
      ))}
    </div>
  );
}
