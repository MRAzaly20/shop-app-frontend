// Mengimpor fetch dari react-native
// import { fetch } from "react-native";
let result = ''
export async function getWishListDataByEmail(email) {
    const apiUrl = "http://192.168.51.90:3000";

    //console.log("mail :" , email)
    try {
        console.log(apiUrl)
        // Membuat opsi untuk request fetch
        const options = {
            method: "GET",
            
        };
        // Menggunakan fetch dengan opsi dan parameter email
        const response = await fetch(`http://192.168.51.90:3000/wishlist/getWish?email=${email}`, options) .then(response => response.json())
        .then(response => {
         //console.log('response', response)
          if (response) {
            const data = JSON.parse(JSON.stringify(response))
            //console.log(data)
            result = data
          } else {
            console.log('error when get data')
          }
        })
        // Mengecek status respons 192.168.51.105
        //console.log("result", result)
        return result
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        throw new Error("Gagal mendapatkan data wishlist belanja");
    }
}
