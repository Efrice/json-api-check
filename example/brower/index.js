const { jsonapiCheck } = require('../../dist/index.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())

app.use(bodyParser.json({ type: 'text/plain' }))

app.all('*', (req, res) => {
  const { path, headers, body } = req
  const { 'x-http-method-override': method } = headers
  const errors = jsonapiCheck(path, method, body)
  res.send(JSON.stringify(errors, null, 2))
})

app.listen(5050, () => {
  console.log('listening on port 5050')
})
