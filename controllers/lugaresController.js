const ListLugares = require('../models/lugaresModel');
const listaEmpreModel = require('../models/lugaresModel');

module.exports = {
    async lugares(req, res, next){
        try {
            const data = await ListLugares.lugarM();
            console.log(`Lugares: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener las listas de los lugares'
            });
        }
    }
}