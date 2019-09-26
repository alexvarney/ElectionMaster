import React from 'react'
import { Media } from 'reactstrap'
import AssetUploadForm from './AssetUploadForm';

export default function AssetManagerItem (props) {
  const { asset, onDelete, onUpdate} = props

  if (!asset) {
    return null
  }

  const deleteAsset = () => {
    if (window.confirm('Are you sure?')) {
      onDelete(asset)
    }
  }

  return (
    <Media>
      <Media left>
        <Media
          object
          src={`/api/assets/file/${asset.shortId}?thumbnail=true`}
          alt={asset.description}
        />
      </Media>
      <Media body style={{ paddingLeft: '1em' }}>
        <Media heading>{asset.name}</Media>
        <p>{asset.description}</p>
        <ul>
          <li>Full size: <code>{`/api/assets/file/${asset.shortId}`}</code></li>
          <li>Thumbnail: <code>{`/api/assets/file/${asset.shortId}?thumbnail=true`}</code></li>
          <li><a href="#" onClick={deleteAsset}>Delete</a></li>
        </ul>
        <AssetUploadForm asset={asset} onUpload={onUpdate} />
      </Media>
    </Media>
  )
}
