import{ randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
        async list (search) {
            let videos

            if (search) {
                videos = await sql `select * from videos where title ilike ${'%'+search+'%'}`
            } else {
                videos = await sql `select * from videos`
            }
    
        return videos
    }

    async create(video) {
        const videoID = randomUUID()
        const {title, descrption, duration} = video

        await sql `insert into videos (id, title, description, duration) VALUES (${videoID}, ${title}, ${descrption}, ${duration})`
    }

    async update(id, video) {
        const {title, description, duration} = video

        await sql `update videos set title=${title}, description=${description}, duration=${duration} where id=${id}`

    }

    async delete(id, video) {
        await sql `delete from videos where id=${id}`
    }
}
