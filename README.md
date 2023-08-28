<p align="center">
  <img src="./assert/jsonapi-check.png" height="168">
</p>

# jsonapi-check

Easy to check type for json api response.

## Install

```bash
npm install jsonapi-check -D
```

## Base Usage

### axios[node]

See [example/node](./example/node/README.md) for more details.

```js
import { jsonapiCheck } from 'jsonapi-check'

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = requset
  const options = {
    schemaDir: 'schema',
    hasSubdirectory: false
  }

  // dev-mode check
  jsonapiCheck(path, method, data, options)
  return response
})
```

### fetch[brower]

See [example/brower](./example/brower/README.md) for more details.

## RESTful API

- GET /authors                   --> schema/authors-GET.ts    --> interface Author
- GET /authors/12                --> schema/author-GET.ts     --> interface Author

## Options

schemaDir: the name of directory for generate json schema type, default `schema`.

hasSubdirectory: the schema directory has subdirectory or not, default `false`.If true, will be next directory.
- GET /authors                   --> schema/authors/authors-GET.ts    --> interface Author
- GET /web/…/authors             --> schema/web/author-GET.ts         --> interface Author

## License

[MIT](./LICENSE) License © 2023-Present Efrice.