import React from 'react'
import './ImageList.css'
import './ImageCard'
import ImageCard from './ImageCard'

const ImageList = ({ images }) => {
  const cards = images.map(({ id, description, urls }) => {
    return (
      <ImageCard
        alt={description}
        src={urls.regular}
        key={id}
      />
    )
  })

  return <div className="image-list">{cards}</div>
}

ImageList.defaultProps = { images: [] }

export default ImageList