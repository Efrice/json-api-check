import axios from 'axios'
import { jsonApiCheck } from '../../../dist/index'

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const paths = request.path.split('/')
  jsonApiCheck(paths[paths.length - 1], data)
  return response
})

axios.get('http://localhost:3000/user').then(function (response) {
  // console.log('response', response.data)
})

axios.get('http://localhost:3000/labels').then(function (response) {
  // console.log('response', response.data)
})
