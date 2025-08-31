import dotenv from 'dotenv'
import databaseConfig from './db/databaseConfig.js'
import app from './app.js'

dotenv.config({path:'../env'})

app.on('error', (err) => {
    console.log('ERRR !!', err)
    throw err
})

databaseConfig()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log('MONGODB connection failed, -', err)
})


databaseConfig()