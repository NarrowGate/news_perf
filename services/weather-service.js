import axios from 'axios'
    
const apiClient = axios.create({  
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getWeather() {
    return apiClient.get('api');
  }
}