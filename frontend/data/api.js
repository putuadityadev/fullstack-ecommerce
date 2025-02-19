import axios from 'axios'
export const URL = 'http://localhost:3000'

export async function getProducts() {
  try {
    const res = await axios.get(`${URL}/products`);
    const productsWithImages = await Promise.all(
      res.data.map(async (product) => {
        const imageRes = await axios.get(`${URL}/images/${product.imageId}`)
        return {
          ...product,
          image: imageRes.data.data,
          id: product._id
        }
      })
    )
    return productsWithImages
  } catch (err) {
    console.error("Error fetching data products:", err)
    throw err
  }
}

export async function createProduct(product) {
  try {
    const productData = {
      ...product
    }
    const res = await axios.post(`${URL}/products`, productData)
    return res.data
    
  } catch (err) {
    console.error("Error proses create product:", err)
    throw err
  }
}

export async function createImage(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post(`${URL}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res  
  } catch (err) {
    console.error("Error upload image:", err.response?.data || err.message)
    throw err
  } 
}


export async function createUser(user) {
  try {
    const userData = {
      ...user
    }
    const res = await axios.post(`${URL}/users`, userData);
    return res.data
  } catch (err) {
    console.error("Eror creating user", err)
    throw err
  }
}

export async function verifyUser(user) {
  try {
    const res = await axios.post(`${URL}/users/login`, user);
    return res.data.token;
  } catch (err) {
    console.error(err)
    throw err
  }
}