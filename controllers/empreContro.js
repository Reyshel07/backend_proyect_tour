const ListEmpre = require('../models/empreModel');

module.exports = {
    async getAll (req, res, next){
        try {
            const data = await ListEmpre.getAllEmpre();
            console.log(`Lista: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error} `);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener las listas'
            });
        }
    },
}