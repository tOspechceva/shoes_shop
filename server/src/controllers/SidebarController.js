import bd from '../models/index.js';
const { sequelize } = bd;
export default {
    async getSeasonsWithTypes(req, res) {
        try {
            // Прямой SQL-запрос
            const [results] = await sequelize.query(`
                SELECT 
                s.id AS season_id,
                s.name AS season_name,
                t.id AS type_id,
                t.name AS type_name
                FROM 
                    Seasons s
                LEFT JOIN 
                    public."Products" p ON s.id = p.id_season
                LEFT JOIN 
                    public."ProductTypes" pt ON p.id = pt."ProductId"
                LEFT JOIN 
                    public."Types" t ON pt."TypeId" = t.id
                ORDER BY 
                    s.id, t.id;
            `);

            // Формируем структуру данных: список сезонов с их типами
            const seasonsMap = results.reduce((acc, row) => {
                // Если сезон еще не добавлен, добавляем его
                if (!acc[row.season_id]) {
                    acc[row.season_id] = {
                        season_id: row.season_id,
                        season_name: row.season_name,
                        types: [],
                    };
                }

                // Проверяем, существует ли уже тип с таким id в массиве типов
                const existingType = acc[row.season_id].types.find(type => type.type_id === row.type_id);

                // Если тип существует, не добавляем его
                if (!existingType && row.type_id) {
                    acc[row.season_id].types.push({
                        type_id: row.type_id,
                        type_name: row.type_name,
                    });
                }

                return acc;
            }, {});

            // Преобразуем объект в массив для отправки
            const seasons = Object.values(seasonsMap);

            // Отправляем результат
            res.status(200).json({
                seasons,
            });
        } catch (error) {
            // Обрабатываем ошибки
            console.error('Error fetching seasons with types:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message,
            });
        }
    }
};

