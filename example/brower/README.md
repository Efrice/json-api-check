# Jsonapi-check brower example

```bash
# start db serve
npm run serve:db

# start local serve
npm run serve

# open index.html with live server

# change db/index.json data, like 18 -> '18'

# Refresh the brower
# Will show error
# FAIL  schema > Users-GET.ts 
# age: type 'string' is not assignable to type 'number'. 
#        2 |      "name": "joe",
# ->     3 |       "age": "18"
#        4 |     };

# Error Info
# filePath   schema > Users-GET.ts
# property   age
# message    type 'string' is not assignable to type 'number'.
```
