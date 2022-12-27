import http from 'http'

const PORT = 5000

const server = http.createServer((req, res) => {
  res.setHeader('access-control-allow-origin', '*')

  if (req.url === '/') {
    res.writeHead(200)
    res.end("Hello there!")
    return
  }

  res.writeHead(404)
  res.end("This route doesn't exist!")
})

server.listen(PORT, () => console.log(`server is running on ${PORT}`))
