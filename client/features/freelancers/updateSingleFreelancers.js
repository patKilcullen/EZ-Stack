import React from 'react'

const updateSingleFreelancers = () => {


  return (
    <form  onSubmit={handleSubmit}>
    <label >Image Url:</label>
    <input
      name="imageUrl"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
    />
    <label htmlFor="name">Name:</label>
    <input
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <label htmlFor="price">Price:</label>
    <input
      name="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
    <label htmlFor="description">Description:</label>
    <input
      name="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <label htmlFor="quantity">Quantity:</label>
    <input
      name="Quantity"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
    />
    <button type="submit">Add Product</button>
    
  </form>
  )
}

export default updateSingleFreelancers