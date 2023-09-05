<p align="center">
  <img src="./public/jsonapi-check.png" height="168">
</p>

# jsonapi-check

Easy to check type for json api response. Auto generate TypeScript schema file by request info ( path, method and response ) at first time, then check json response according to the associated TypeScript schema next request. Of course, the TypeScript schema files can be rewritten.

## Install

```bash
npm install jsonapi-check -D
```

## Usage

### axios[node]

See [example/node](https://github.com/Efrice/jsonapi-check/blob/main/example/node/README.md) for more details.

```js
import { jsonapiCheck } from "jsonapi-check"

axios.interceptors.response.use((response) => {
  const { request, data } = response
  const { path, method } = requset
  const options = {
    schemaDir: "schema",
    hasSubdirs: false,
  }

  // dev-mode check
  jsonapiCheck(path, method, data, options)
  return response
})
```

### fetch[brower]

See [example/brower](https://github.com/Efrice/jsonapi-check/blob/main/example/brower/README.md) for more details.

## RESTful API

- GET /authors --> schema/authors-GET.ts --> interface Author
- GET /authors/12 --> schema/author-GET.ts --> interface Author

## Options

### schemaDir

- Type: `string`
- Default: `schema`

The name of directory for generate json schema type.

### hasSubdirs

- Type: `boolean`
- Default: `false`

The schema directory has subdirectory or not. If true, will mkdir like next directory.

- GET /authors --> schema/authors/authors-GET.ts --> interface Author
- GET /web/…/authors --> schema/web/author-GET.ts --> interface Author

✨ Happy hacking!

## License

[MIT](./LICENSE) License © 2023-Present Efrice.
