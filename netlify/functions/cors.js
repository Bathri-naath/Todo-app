const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
}

exports.success = (data) => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(data)
})

exports.error = (err) => ({
  statusCode: 500,
  headers,
  body: JSON.stringify({ error: err.message })
})

exports.badRequest = (msg) => ({
  statusCode: 400,
  headers,
  body: JSON.stringify({ error: msg })
})

exports.options = () => ({
  statusCode: 200,
  headers,
  body: ""
})