import React from 'react'
import { API } from '../../backend'

export default function ImageHelper({product}) {
  const imageulr = product && product.photo && product.photo.data
  ?`${API}/foodphoto/${product._id}` 
  :`https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-1200x628-facebook-1200x628.jpg`
    return (
        <div className="rounded border border-success p-2">
                <img
                  src={imageulr}
                  alt={product.dishName}
                  title={product.dishName}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
        </div>
              
    )
}
