import axios from 'axios'
import { jsonapiCheck } from '../../../dist/index'

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = request
  jsonapiCheck(path, method, data, {
    hasSubdirectory: true
  })
  return response
})

axios.get('http://localhost:3000/users').then(function (response) {
  console.log('response', typeof response.data)
})

// axios.get('http://localhost:3000/labels').then(function (response) {
//   console.log('response', response.data)
// })
