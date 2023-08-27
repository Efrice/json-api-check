const axios = require('axios')
const { jsonapiCheck } = require('../../dist/index')

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = request

  jsonapiCheck(path, method, data)
  return response
})

axios.get('http://localhost:3000/users').then(function (response) {
  console.log('response', response.data)
})

axios.get('http://localhost:3000/labels').then(function (response) {
  console.log('response', response.data)
})
