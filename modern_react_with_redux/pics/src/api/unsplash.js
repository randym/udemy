import axios from 'axios'

const ACCESS_KEY = 'lWPSye57Fh_d-WsTujyxmNXMtZUAg8TUgt3LkXKgCug'
// const SECRET_KEY = 'ihkoe96C-1NiPsrX6Z00lLRF37ZSmuOfiIHefoJp07Q'


export default axios.create({
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`
  },
  baseURL: 'https://api.unsplash.com',
})

