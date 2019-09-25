import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import {connect} from 'react-redux'

import styles from './css/AssetUploadForm.module.css'

export default function AssetUploadForm (props) {
  const [image, setImage] = useState(null)
  const [formFields, setFormFields] = useState({
    name: '',
    description: ''
  })

  const handleFormChange = (event) => {
    event.persist()
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    event.persist()
    if (!image) {
      console.log('No image selected!')
      return
    }

    var formUpload = new FormData()

    for (const [key, value] of Object.entries(formFields)) {
      formUpload.set(key, value)
    }

    formUpload.append('image', image)

    axios({
      method: 'POST',
      url: '/api/assets',
      data: formUpload,
      config: ({
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }).then(res => {
      props.onUpload()
    }).catch(err => {
      console.log(err)
    })
  }

  const onImageChange = (event) => {
    event.persist()
    event.stopPropagation()

    const file = event.target.files[0]

    if (file) {
      setImage(file)
    }
  }

  return (
    <div className={styles.containerStyle}>

      <h4>Upload an Image:</h4>

      <Form onSubmit={onSubmit} onChange={handleFormChange}>
        <FormGroup>
          <Label for='file'>Select a file:</Label>
          <Input type='file' name='image' id='file' onChange={onImageChange} />
        </FormGroup>
        <FormGroup>
          <Label for='name'>Name:</Label>
          <Input name='name' value={formFields.name} placeholder='Image name' />
        </FormGroup>
        <FormGroup>
          <Label for='description'>Description:</Label>
          <Input name='description' value={formFields.description} placeholder='Image description' />
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}