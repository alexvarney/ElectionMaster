import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import axios from 'axios'
import AssetManagerItem from './AssetManagerItem'
import AssetUploadForm from './AssetUploadForm'

const AssetManager = props => {
  const [assets, setAssets] = useState([])

  const getAssets = () => {
    axios.get('/api/assets').then(res => {
      setAssets(res.data)
    })
  }

  useEffect(() => {
    // Look for candidate update as this means the server is running
    getAssets()
  }, [props.candidates])

  const onUpload = () => {
    getAssets()
  }

  const deleteAsset = asset => {
    const { token } = props.user

    if (token) {
      const newList = assets.filter(item => item.shortId !== asset.shortId)
      setAssets(newList)

      axios.delete(`/api/assets/${asset.shortId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    }
  }

  return (
    <div>
      <h3>Asset Manager</h3>
      <Button onClick={getAssets}>Refresh</Button>
      <AssetUploadForm onUpload={onUpload} />
      <ListGroup>
        {assets.map(item => (
          <ListGroupItem key={item._id}>
            <AssetManagerItem asset={item} onDelete={deleteAsset} onUpdate={onUpload} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = state => ({
  canadidates: state.candidates.candidates,
  user: state.user
})

export default connect(
  mapStateToProps,
  {}
)(AssetManager)
