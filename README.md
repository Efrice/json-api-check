![logo](./assert/jsonapi-check.png)

# jsonapi-check

Easy to check type for json api response.

## Install

```bash
npm install jsonapi-check -D
```

## RESTful API

GET /authors                   --> schema/GET-authors.ts    --> interface Author
GET /authors/12                --> schema/GET-author.ts     --> interface Author
GET /authors/12?categories=2   --> schema/GET-author.ts     --> interface Author
GET /articles?published=true   --> schema/GET-articles.ts   --> interface Article

## Base Usage

### axios

#### node
```js
import { jsonapiCheck } from 'jsonapi-check'

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = requset

  // check
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
```
