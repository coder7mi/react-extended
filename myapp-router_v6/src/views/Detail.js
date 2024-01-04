import React from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

export default function Detail() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // console.log(searchParams.get('id'))

  const params = useParams()
  console.log(params.id)

  const navigate = useNavigate()
  return (
    <div>
      Detail
      <button
        onClick={() => {
          // setSearchParams({ id: '777' }) //修改参数
          navigate('/detail/100')
        }}
      >
        猜你喜欢
      </button>
    </div>
  )
}
