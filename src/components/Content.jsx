import React, { memo, useState, useEffect } from 'react'

import { Chart } from './Chart'
import { Stat } from './Stat'
import { Spinner } from '@blueprintjs/core'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const MainConteiner = styled.div`
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 1100px;
`

const baseUrl = 'http://192.168.20.253:7070/api/stats/interval'

const Content = memo(() => {
  const { start, stop, ats } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const url = `${baseUrl}?start=${start}&stop=${stop}`
      setData(await fetch(url).then(data => data.json()))
      setLoading(false)
    }
    loadData()
  }, [start, stop, ats])
  
  const filtredData = data
    .map(el => ({ time: el.time, data: el[ats] }))
    .filter(({ data }) => data)
  
    return (
    <MainConteiner>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Stat data={filtredData} ats={ats}/>
            <Chart width={800} height={400} data={filtredData}></Chart>
        </>
      )}
    </MainConteiner>
  )
})

export { Content }
