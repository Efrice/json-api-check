const { fetch: rawFetch } = window

window.fetch = async (...args) => {
  const response = await rawFetch(...args)
  response.json().then(data => {
    const headers = { 'X-HTTP-Method-Override': getMethod(args[1] || {}).toUpperCase() }
    rawFetch(changeURLPORT(args[0]), { method: "POST", headers, body: JSON.stringify(data)})
    .then(res => res.json())
    .then(res => printErrorLog(res))
  })
  return response
}

function changeURLPORT(url){
  return url.replace(3000, 5050)
}

function getMethod(options){
  const { method, headers = {} } = options
  const { 'x-http-method-override': httpMethodOverride } = headers

  return method || httpMethodOverride || 'GET'
}


function printErrorLog({ filePath, errors }) {
  if(errors.length === 0) return
  
  let errorLog = ''
  errorLog += `FAIL ${filePath}\n`
  errors.forEach((error) => {
    const { line, property, message } = error
    errorLog += `  -> ${line}.${property}: ${message}\n`
  })
  console.error(errorLog)
}
