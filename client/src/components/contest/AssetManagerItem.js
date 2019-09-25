import React from 'react'
import { Media } from 'reactstrap'

export default function AssetManagerItem(props) {

  const {asset} = props

  if(!asset){
    return null
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
      <Media body style={{paddingLeft: '1em'}}>
        <Media heading>{asset.name}</Media>
        <p>{asset.description}</p>
        <ul>
          <li>Full size: <code>{`/api/assets/file/${asset.shortId}`}</code></li>
          <li>Thumbnail: <code>{`/api/assets/file/${asset.shortId}?thumbnail=true`}</code></li>
        </ul>
      </Media>
    </Media>
  );
}
