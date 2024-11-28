// controllers/productController.js
//import Product from '../models/Product.js';
//import Season from '../models/Season.js';
//import Material from '../models/Material.js';
//import Insulation from '../models/Insulation.js';
//import Manufacturer from '../models/Manufacturer.js';
import bd from '../models/index.js';

const { Colore } = bd;

export default {
    async add(req, res) {
        try {
            const colore = await Colore.create(req.body);
            res.send({
                colore: colore
            });
        } catch  {
                res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    }

};