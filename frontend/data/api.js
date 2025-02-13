import axios from 'axios'
const URL = 'http://localhost:3000'

export async function getProducts() {
  try {
    const res = await axios.get(`${URL}/products`);
    return res.data
  } catch (err) {
    console.error("Error fetching data products:", err)
    throw err
  }
}
