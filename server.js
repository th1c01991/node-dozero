/*import {createServer} from 'node:http'

const server = createServer((request, response) => {
    response.write('ola')

    return response.end()

})

server.listen(3333) //porta para acesso - ajuda quando tiver várias aplições em minha maquina e cada uma em uma porta */

import {fastify} from 'fastify'

//import {DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify ()

//const database = new DatabaseMemory()

const database = new DatabasePostgres()

//Pelo navegador apenas rotas GET podem ser testadas

//Request Body pode ser usado no POST e PUT para criar um corpo para requisição
server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body

    await database.create ({
        title,
        description,
        duration,
    })

    return reply.status(201).send() //significa que algo foi criado (201)
})

server.get('/videos', async (request) => {
    const search = request.query.search
    
    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })
    
    return reply.status(204).send()
})

server.delete('/videos/:id', async (request,reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.port ?? 3333
}).then(() => {
    console.log('Servidor ligado')
}
)