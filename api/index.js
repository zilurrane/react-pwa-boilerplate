const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const API_PORT = process.env.PORT || 7777

server.use(middlewares)
server.use("/api", router)

server.listen(API_PORT, () => {
    console.log('JSON Server is running on PORT ' + API_PORT)
})