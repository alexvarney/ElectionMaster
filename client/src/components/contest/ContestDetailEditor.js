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

  const { selectedContest, setSelectedContest } = props

  const handleFieldChange = event => {
    event.persist()
    setSelectedContest({
      ...selectedContest,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.container}>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>Name</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.name : ''}
          name='name'
          onChange={handleFieldChange}
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
          name='description'
          onChange={handleFieldChange}
          disabled={!selectedContest}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>URL</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.url : ''}
          name='url'
          onChange={handleFieldChange}
          disabled={!selectedContest}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>Country</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.country : ''}
          name='country'
          onChange={handleFieldChange}
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

      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>Banner Image</InputGroupText>
        </InputGroupAddon>
        <Input
          value={selectedContest ? selectedContest.bannerImage : ''}
          name='bannerImage'
          onChange={handleFieldChange}
          disabled={!selectedContest}
        />
      </InputGroup>
    </div>
  )
}
