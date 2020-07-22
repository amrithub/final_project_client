import axios from 'axios'

// Create an axios instance
export default axios.create({
  baseURL: 'https://gentle-tundra-64079.herokuapp.com/',
  timeout: 10000,
  withCredentials: true
})