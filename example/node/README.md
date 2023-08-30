# Jsonapi-check node example

```bash
# start db serve
npm run serve:db
# run test to auto generate interface file form json api response in schema dictionary
npm run test

# change db/index.json, like 18 -> '18'
npm run test

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
