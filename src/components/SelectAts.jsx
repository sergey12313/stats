import React, { memo } from 'react'
import { Select } from '@blueprintjs/select'
import { MenuItem, Button } from '@blueprintjs/core'
import { ATS } from '../constants'

const data = ATS.map((m, index) => ({ ...m, rank: index + 1 }))

function escapeRegExpChars(text) {
  return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
}

function highlightText(text, query) {
  let lastIndex = 0
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars)
  if (words.length === 0) {
    return [text]
  }
  const regexp = new RegExp(words.join('|'), 'gi')
  const tokens = []
  while (true) {
    const match = regexp.exec(text)
    if (!match) {
      break
    }
    const length = match[0].length
    const before = text.slice(lastIndex, regexp.lastIndex - length)
    if (before.length > 0) {
      tokens.push(before)
    }
    lastIndex = regexp.lastIndex
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>)
  }
  const rest = text.slice(lastIndex)
  if (rest.length > 0) {
    tokens.push(rest)
  }
  return tokens
}

const filterAts = (query, ats, _index, exactMatch) => {
  const normalizedTitle = ats.title.toLowerCase()
  const normalizedQuery = query.toLowerCase()

  if (exactMatch) {
    return normalizedTitle === normalizedQuery
  } else {
    return (
      `${ats.rank}. ${normalizedTitle} ${ats.year}`.indexOf(normalizedQuery) >=
      0
    )
  }
}

const renderAts = (ats, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  const text = `${ats.rank}. ${ats.title}`
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={ats.count.toString()}
      key={ats.rank}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  )
}

const SelectAts = memo(({ onItemSelect, atsId }) => {
  return (
    <Select
      items={data}
      itemPredicate={filterAts}
      itemRenderer={renderAts}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={onItemSelect}
    >
      <Button
        icon="office"
        text={data.find(({ id }) => id === atsId).title}
        rightIcon="double-caret-vertical"
      />
    </Select>
  )
})

export { SelectAts }
