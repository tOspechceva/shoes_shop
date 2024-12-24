const config = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'shop',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'LenaTom03',
        options: {
            host: process.env.DB_HOST || 'localhost', // Используется 'postgres' из docker-compose
            dialect: 'postgres',
            logging: console.log,
        },
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}

export default config;
