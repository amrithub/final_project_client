import axios from 'axios'

// Create an axios instance
export default axios.create({
  //baseURL: 'http://localhost:3009',
   baseURL: 'https://gentle-tundra-64079.herokuapp.com/',
  timeout: 5000,
  withCredentials: true
})