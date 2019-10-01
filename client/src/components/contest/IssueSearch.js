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

export default function IssueSearch (props) {
  const { contest, issues, setSearchResults } = props

  const getIssueById = (id) => {
    return issues ? issues.filter(item => item._id === id)[0] || null : null
  }

  const sortCandidates = list =>
    list.sort((a, b) => (a.name > b.name ? 1 : -1))

  const getCandidateList = () =>
    contest.issues
      .map(id => getIssueById(id))
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
          issues.filter(candidate =>
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
  }, [issues])

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
            ? 'All Issues'
            : 'Contest Issues'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSearchMode(searchModes.contest)}>
            Contest Issues
          </DropdownItem>
          <DropdownItem onClick={() => setSearchMode(searchModes.all)}>
            All Issues
          </DropdownItem>
        </DropdownMenu>
      </InputGroupButtonDropdown>
    </InputGroup>
  )
}
