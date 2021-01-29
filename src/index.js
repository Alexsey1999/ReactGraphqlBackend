import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'
import schema from './schema/schema.js'

const app = express()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
)

mongoose.connect(
  'mongodb://localhost:27017/testtask',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Подключился к базе')
  }
)

app.listen(3001, () => {
  console.log('Сервер запущен...')
})
