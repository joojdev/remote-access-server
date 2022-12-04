const express = require('express')
const http = require('http')
const path = require('path')
const { exec } = require('child_process')

const expressApp = express()
const httpServer = http.createServer(expressApp)

expressApp.use(express.static(path.join(__dirname, 'public')))
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))

expressApp.post('/command', (request, response) => {
  if (!request.body.command.trim()) return

  exec(request.body.command, (error, stdout, stderr) => {
    if (error) return response.json({ message: stderr })

    return response.status(200).json({ message: stdout })
  })
})

expressApp.get('/shutdown', (request, response) => {
  switch(process.platform) {
    case 'linux':
      exec('shutdown -h now')
      break
    case 'win32':
      exec('shutdown -s -t 0 -f')
      break
  }

  return response.status(200).end()
})

const PORT = 3000
httpServer.listen(PORT, () => {
  console.log(`Remote Access Server is listening on port ${PORT}!`)
})