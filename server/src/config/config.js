const config = {
    port: process.env. PORT || 8081,
    db: {
        database: 'shop',
        user: 'postgres',
        password: 'LenaTom03',
        options: {
            host: 'localhost',
            dialect: 'postgres',
            logging: console.log, // Включает логирование запросов
        },
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}

export default config;  // Экспорт по умолчанию