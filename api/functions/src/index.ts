import * as functions from 'firebase-functions'
import * as express from 'express'
import send from './mailer'
import { IRequest } from './types'

export const app = express()
app.use(express.json())

app.post('/', (req, res) => {
  const payload: IRequest = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  }
  send(payload)
  res.send('success')
})

export const api = functions.https.onRequest(app)

// let port = 3000
// app.listen(port, () => {
//   console.log('Expressサーバー起動')
// })
