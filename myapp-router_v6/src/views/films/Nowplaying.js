import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FilmItem from '../../components/FilmItem'

export default function Nowplaying() {
  const [list, setList] = useState([])
  useEffect(() => {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=5960505',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"17026203861815637294841857","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      setList(res.data.data.films)
    })
  }, [])

  // const navigate = useNavigate()
  // const jump = (id) => {
  //   // navigate(`/detail?id=${id}`)
  //   navigate(`/detail/${id}`)
  // }
  return (
    <div>
      <ul>
        {list.map((item) => {
          return <FilmItem key={item.filmId} {...item} />
        })}
      </ul>
    </div>
  )
}
