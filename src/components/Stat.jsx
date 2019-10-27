import React, { memo } from 'react'
import styled from 'styled-components'
import { ATS } from '../constants'

const StatsContainer = styled.div`
  margin-top: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  width: ${props => `${props.width}px` || '100%'};
`
const StatTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: start;
`
const TableRow = styled.tr`
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border-bottom: none;
  }
`
const TableCellHeader = styled.th`
  padding: 8px 16px;
  background-color: #fafafa;
  border-right: 1px solid #e8e8e8;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  text-align: inherit;
  white-space: nowrap;
`
const TableCellContent = styled.td`
  padding: 8px 16px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
`

const Row = memo(({ header, content }) => {
  return (
    <TableRow>
      <TableCellHeader>{header}</TableCellHeader>
      <TableCellContent>{content}</TableCellContent>
    </TableRow>
  )
})
const Table = memo(({ children }) => {
  return (
    <StatTable><tbody>{children}</tbody></StatTable>
  )
})

const Stat = memo(({ data, ats }) => {
  const stat = ATS.find(({ id }) => id === ats)
  return (
    <StatsContainer width={1000}>
      <Table>
        <Row header="Тип" content={stat.type} />
        <Row header="Общая емкость:" content={stat.count} />
        <Row header="Описание:" content={stat.title} />
      </Table>
    </StatsContainer>
  )
})

export { Stat }
