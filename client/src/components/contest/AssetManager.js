import React, { useEffect, useState, useDebugValue } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import axios from 'axios'
import AssetManagerItem from './AssetManagerItem'
import AssetUploadForm from './AssetUploadForm'

const AssetManager = (props) => {
  const [assets, setAssets] = useState([])

  const getAssets = () => {
    axios
      .get('/api/assets')
      .then(res => {
        setAssets(res.data)
      })
  }

  useEffect(() => {
    getAssets()
  }, [props.candidates])

  useDebugValue(assets)

  const onUpload = () => {
    getAssets()
  }

  return (
    <div>
      <h3>Asset Manager</h3>
      <Button onClick={getAssets}>Refresh</Button>
      <AssetUploadForm onUpload={onUpload} />
      <ListGroup>
        {assets.map(item =>
          <ListGroupItem key={item._id}>
            <AssetManagerItem asset={item} />
          </ListGroupItem>)}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = (state) => ({
  canadidates: state.candidates.candidates
})

export default connect(mapStateToProps, {})(AssetManager)
