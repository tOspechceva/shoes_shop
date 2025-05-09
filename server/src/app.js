import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan'
import config from './config/config.js';

import { setupRoutes } from './router/router.js';
import db from './models/index.js';

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());

setupRoutes(app);


// Синхронизируем базу данных и устанавливаем флаг force: true, чтобы сбросить таблицы (Осторожно, это приведёт к удалению данных)
db.sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });