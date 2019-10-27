import React, { memo, useState, useEffect } from 'react'
import { SelectAts } from './SelectAts'
import { DateRangeInput } from '@blueprintjs/datetime'
import MomentLocaleUtils from 'react-day-picker/moment'
import {
  Navbar,
  NavbarHeading,
  NavbarGroup,
  NavbarDivider,
  FormGroup,
} from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import 'moment/locale/ru'

const Header = memo(({ start, end, atsId }) => {
  let history = useHistory()
  const [dateRange, setDateRange] = useState([start, end])
  const [selectedAts, setSelectedAts] = useState(atsId)

  const onChangeDate = range => {
    if (range.every(value => value instanceof Date)) {
      setDateRange(range)
    }
  }
  const onSelectChange = ({ id }) => {
    setSelectedAts(id)
  }

  useEffect(() => {
    const [start, stop] = dateRange.map(el => (el.getTime() / 1000).toFixed())
    const redirect = () => {
      history.push(`/${selectedAts}/${start}/${stop}`)
    }
    redirect()
  }, [selectedAts, dateRange, history])

  return (
    <Navbar fixedToTop>
      <NavbarGroup>
        <NavbarHeading>Stats</NavbarHeading>
        <NavbarDivider />
        <FormGroup style={{ marginBottom: 0 }} label="АТС: " inline={true}>
          <SelectAts atsId={selectedAts} onItemSelect={onSelectChange} />
        </FormGroup>
        <NavbarDivider />
        <FormGroup style={{ marginBottom: 0 }} label="Интервал: " inline={true}>
          <DateRangeInput
            localeUtils={MomentLocaleUtils}
            locale="ru"
            shortcuts={true} //todo add russian shortcuts
            formatDate={date => date.toLocaleString()}
            parseDate={str => new Date(str)}
            value={dateRange}
            selectAllOnFocus={false}
            singleMonthOnly={false}
            onChange={onChangeDate}
          />
        </FormGroup>
      </NavbarGroup>
    </Navbar>
  )
})

export { Header }
