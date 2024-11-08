const listaEmpreModel = require('../models/listaLugaresModel');

module.exports = {
    async getAll(req, res, next){
        try {
            const data = await listaEmpreModel.getAll();
            console.log(`Lugares: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log.apply(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener las listas de los lugares'
            });
        }
    }
}