# Jsonapi-check brower example

```bash
# start db serve
npm run serve:db

# start serve
npm run serve

# open index.html with live server

# change db/index.json data, like 18 -> '18'

#  refresh the brower
#  will show next error
#  FAIL  schema > Users-GET.ts
#  -> 3.age:  type 'string' is not assignable to type 'number'.

# Error Info
# filePath   schema > Users-GET.ts
# line       3
# property   age
# message    type 'string' is not assignable to type 'number'.
```
