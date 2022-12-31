const axios = require('axios')
const {API_KEYY} = process.env
const URL= 'https://api.rawg.io/api/genres'

const infoGeneros= async()=>{
    const result = await axios.get(`${URL}?key=${API_KEYY}`)
    const data = result.data.results
   // console.log(data)
    return data
}

module.exports={
    infoGeneros,
}