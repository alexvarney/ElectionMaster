import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap'
import styles from './css/IssueSearch.module.css'

export default function IssueSearch (props) {
  const { tags, issues, setFilteredIssues } = props

  const [searchField, setSearchField] = useState('')
  const handleSearchChange = event => {
    event.persist()
    setSearchField(event.target.value)
  };

  const sortedTags = tags ? tags.sort() : []

  const [filteredTags, setFilteredTags] = useState([])
  const toggleTag = tag => {
    if (filteredTags.includes(tag)) {
      setFilteredTags(filteredTags.filter(item => item !== tag))
    } else {
      setFilteredTags([...filteredTags, tag])
    }
  }

  const selectAll = () => setFilteredTags([])
  const selectNone = () => setFilteredTags(tags)

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen)

  const updateFilteredIssues = () => {
    const filteredIssues = issues
      .filter(issue => issue.name.toLowerCase().includes(searchField.toLowerCase()))
      .reduce((issueAcc, currentIssue) => {
        if (!currentIssue.tags || currentIssue.tags.length === 0) {
          // Include the item if it has no tags
          return [...issueAcc, currentIssue]
        } else {
          // Check if all of the tags are in the list of filtered tags
          const allIncluded = currentIssue.tags.reduce((tagAcc, currentTag) => {
            return tagAcc && filteredTags.includes(currentTag)
          }, true)

          return !allIncluded ? [...issueAcc, currentIssue] : issueAcc
        }
      }, [])

    setFilteredIssues(filteredIssues)
  };

  useEffect(() => {
    updateFilteredIssues()
  }, [filteredTags, props.tags, searchField])

  return (
    <div className={styles.container}>
      <ul className={styles.dropdownList_standalone}>
        {sortedTags.map(tag => (
          <li onClick={() => toggleTag(tag)} key={tag}>
            <div>
              <input type='checkbox' checked={!filteredTags.includes(tag)} onChange={()=>{}}/>
              <span>{tag}</span>
            </div>
          </li>
        ))}
        <li>
          Select:{' '}
          <a href='#' onClick={selectAll}>
            All
          </a>{' '}
          /{' '}
          <a onClick={selectNone} href='#'>
            None
          </a>
        </li>
      </ul>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>
            <i className='fas fa-search' />
          </InputGroupText>
        </InputGroupAddon>
        <Input value={searchField} onChange={handleSearchChange} placeholder="Search issues" />
      </InputGroup>
    </div>
  )
}
