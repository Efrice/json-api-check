<p align="center">
  <img src="./assert/jsonapi-check.png" height="168">
</p>

# jsonapi-check

Easy to check type for json api response.

## Install

```bash
npm install jsonapi-check -D
```

## RESTful API

- GET /authors                   --> schema/GET-authors.ts    --> interface Author
- GET /authors/12                --> schema/GET-author.ts     --> interface Author

## Base Usage

### axios

#### node
```js
import { jsonapiCheck } from 'jsonapi-check'

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = requset

  // dev-mode check
  jsonapiCheck(path, method, data)
  return response
})
```

#### brower

```js
axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = request

  // fetch
  // TODO
  // GET NO BODY
  fetch('http://localhost:3000/' + path, {
    method,
    body: data
  })
  return response
})
```

express app

```js
const { jsonapiCheck } = require('../../dist/index.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())

app.use(bodyParser.json({ type: 'text/plain' }))

app.all('*', (req, res) => {
  const { url, method, body, path } = req

  const errors = jsonapiCheck(path, method, body)
  res.send(errors)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
```
