import React, { useState, useEffect } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import { getCandidateById } from '../_helpers'

export default function CandidateSearch (props) {
  const { contest, candidates, setSearchResults } = props

  const sortCandidates = list =>
    list.sort((a, b) => (a.name > b.name ? 1 : -1))

  const getCandidateList = () =>
    contest.candidates
      .map(id => getCandidateById(id, candidates))
      .filter(item => item && item._id)

  const [searchFieldValue, _setSearchFieldValue] = useState('')

  const setSearchFieldValue = event => {
    _setSearchFieldValue(event.target.value)
    setSearchResults(getSearchResults())
  }

  const [searchDropdownOpen, setSearchDropdown] = useState(false)
  const toggleSearchDropdown = () => setSearchDropdown(!searchDropdownOpen)

  const searchModes = {
    contest: 'CONTEST',
    all: 'ALL'
  }
  const [searchMode, setSearchMode] = useState(searchModes.contest)

  const getSearchResults = () => {
    const searchResults =
      searchMode === searchModes.all
        ? sortCandidates(
          candidates.filter(candidate =>
            candidate.name
              .toLowerCase()
              .includes(searchFieldValue.trim().toLowerCase())
          )
        )
        : sortCandidates(
          getCandidateList().filter(candidate =>
            candidate.name
              .toLowerCase()
              .includes(searchFieldValue.trim().toLowerCase())
          )
        )
    return searchResults
  }

  // Refresh candidates when the search mode changes
  useEffect(() => {
    if (contest && contest.candidates && searchFieldValue === '') {
      setSearchResults(getSearchResults())
    }
  }, [contest, searchMode])

  // Refresh candidates when the Redux store updates
  useEffect(() => {
    if (contest && contest.candidates) {
      setSearchResults(getSearchResults())
    }
  }, [candidates])

  return (
    <InputGroup>
      <InputGroupAddon addonType='prepend'>
        <InputGroupText>
          <i className='fas fa-search' />
        </InputGroupText>
      </InputGroupAddon>

      <Input
        type='text'
        value={searchFieldValue}
        onChange={setSearchFieldValue}
      />

      <InputGroupButtonDropdown
        addonType='append'
        isOpen={searchDropdownOpen}
        toggle={toggleSearchDropdown}
      >
        <DropdownToggle caret>
          {searchMode === searchModes.all
            ? 'All Candidates'
            : 'Contest Candidates'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSearchMode(searchModes.contest)}>
            Contest Candidates
          </DropdownItem>
          <DropdownItem onClick={() => setSearchMode(searchModes.all)}>
            All Candidates
          </DropdownItem>
        </DropdownMenu>
      </InputGroupButtonDropdown>
    </InputGroup>
  )
}
