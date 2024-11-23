/* eslint-env node */

import express from 'express';         
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

console.log('hello')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => {
    res.send({
        message: 'hello world!!'
    })
})

app.listen(process.env.PORT || 8081)
