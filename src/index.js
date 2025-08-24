import dotenv from 'dotenv'
import databaseConfig from './db/databaseConfig.js'

dotenv.config({path:'../env'})

databaseConfig()