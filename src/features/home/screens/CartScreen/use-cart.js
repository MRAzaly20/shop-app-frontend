let result = ''
export async function getCartDataByEmail(email) {
    const apiUrl = "http://192.168.51.90:3000";

    
    try {
        console.log(apiUrl)
        
        const options = {
            method: "GET",
            
        };
        
        const response = await fetch(`http://192.168.51.90:3000/cart/getCart?email=${email}`, options) .then(response => response.json())
        .then(response => {
         
          if (response) {
            const data = JSON.parse(JSON.stringify(response))
            
            result = data
          } else {
            console.log('error when get data')
          }
        })
        
        
        return result
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        throw new Error("Gagal mendapatkan data keranjang belanja");
    }
}
