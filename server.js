const http = require('http')

const port = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'Krateo Army Knife' }))
})

server.listen(port)
