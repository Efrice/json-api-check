const { jsonapiCheck } = require('../../dist/index.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())

app.use(bodyParser.json({ type: 'text/plain' }))

app.all('*', (req, res) => {
  const { url, method, body, path } = req
  console.log('path:', path)
  console.log('url:', url)
  console.log('method:', method)
  console.log('body:', body)
  jsonapiCheck(path, method, body)
  res.send({
    msg: "hello  world"
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
