import axios from 'axios'

const apiUrl = 'http://192.168.51.90:3000'
let result = ''

export async function createCart(data) {
  console.log(data)
  try {
    const response = await axios
      .post(`${apiUrl}/cart/createCart`, data)
      .then((response) => {
        if (response) {
          const data = JSON.parse(JSON.stringify(response))

          result = data
        } else {
          console.log('error when get data')
        }
      })

    return result
  } catch (error) {
    console.error('Terjadi kesalahan:', error)

    throw new Error('Gagal membuat keranjang belanja baru')
  }
}

export async function createWishList(data) {
  console.log(data)
  try {
    const response = await axios
      .post(`${apiUrl}/wishlist/createWishlist`, data)
      .then((response) => {
        if (response) {
          const data = JSON.parse(JSON.stringify(response))
          console.log(response.status)
          result = data
        } else {
          console.log('error when get data')
        }
      })

    return result
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return error.response.status
    } else {
      console.error('Terjadi kesalahan:', error)
      throw new Error('Gagal membuat keranjang belanja baru')
    }
  }
}
