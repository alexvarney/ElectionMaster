import React from 'react'
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  FormGroup,
  Label
} from 'reactstrap'
import countries from 'iso-3166-country-list'
import styles from './css/ContestDetailEditor.module.css'

export default function ContestDetailEditor (props) {
  const { selectedContest, eventHandlers } = props

  const {
    onNameChange,
    onDescriptionChange,
    onUrlChange,
    onCountryChange,
    toggleDefaultStatus
  } = eventHandlers

  return (
    <div className={styles.container}>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>Name</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.name : ''}
          onChange={onNameChange}
          disabled={!selectedContest}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>Description</InputGroupText>
        </InputGroupAddon>
        <Input
          type='textarea'
          value={selectedContest ? selectedContest.description : ''}
          onChange={onDescriptionChange}
          disabled={!selectedContest}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>URL</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.url : ''}
          onChange={onUrlChange}
          disabled={!selectedContest}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>Country</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.country : ''}
          onChange={onCountryChange}
          disabled={!selectedContest}
        />
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>
            {countries.name(
              selectedContest && selectedContest.country
                ? selectedContest.country
                : ''
            )}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <FormGroup check>
        <Label check>
          <Input
            checked={
              selectedContest && selectedContest.default !== undefined
                ? selectedContest.default
                : false
            }
            onChange={toggleDefaultStatus}
            type='checkbox'
          />{' '}
          Make default contest
        </Label>
      </FormGroup>
    </div>
  )
}
