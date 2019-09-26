import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

import styles from './css/AssetUploadForm.module.css';

function AssetUploadForm (props) {
  const { asset } = props

  const [image, setImage] = useState(null)

  const [formFields, setFormFields] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (asset) {
      setFormFields({
        name: asset.name,
        description: asset.description
      })
    }
  }, [asset])

  const handleFormChange = event => {
    event.persist()
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    })
  };

  const onSubmit = event => {
    event.preventDefault()
    event.persist()

    if (!asset && !image) {
      console.log('No image selected!')
      return
    }

    var formUpload = new FormData()
    
    if (image) {
      formUpload.append('image', image)
    }

    for (const [key, value] of Object.entries(formFields)) {
      formUpload.set(key, value)
    }
    
    const { token } = props.user

    if (token) {
      if (!asset) {
        axios
          .post('/api/assets', formUpload, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => props.onUpload())
          .catch(err => console.log(err))
      } else {
        axios
          .put(`/api/assets/${asset.shortId}`, formUpload, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => props.onUpload())
          .catch(err => console.log(err))
      }
    } else {
      console.log('Not logged in!')
    }
  }

  const onImageChange = event => {
    event.persist()
    event.stopPropagation()

    const file = event.target.files[0]

    if (file) {
      setImage(file)
    }
  }

  return (
    <div className={styles.containerStyle}>
      <h4>{asset ? 'Update' : 'Upload'} Image:</h4>

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
          <Input
            name='description'
            value={formFields.description}
            placeholder='Image description'
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  {}
)(AssetUploadForm)
