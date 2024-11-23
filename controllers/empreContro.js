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

    async searchTourEm (req, res, next){
        try {
            const {nombre} = req.body;
            const searchEmpre = await ListEmpre.getTourEmpre(nombre);
            if (searchEmpre && searchEmpre.length > 0) {
                return res.status(201).json({
                    success: true,
                    message: 'tour encontados',
                    data: searchEmpre
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'tours no encontrados'
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al buscar los tours'
            })
        }
    },

    async creatCometC (req, res, next) {
        try {
           const Coment = req.body;
           const ComentData = await ListEmpre.creatComent(Coment);
           if (ComentData) {
            console.log(`Comentario exitoso: ${ComentData}`);
            return res.status(200).json({
                success: true,
                message: `Comentario exitoso`,
                data: ComentData
            })
           }else{
            return res.status(400).json({
                success: false,
                message: 'comentario fallido'
            })
           }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al comentar'
            })
        }
    },

    async getAllComentC(req, res, next){
        try {
            const nombre = req.body;
            const coment = await ListEmpre.getAllComent(nombre);

            if (coment) {
                console.log(`Comentarios: ${coment}`);
                return res.status(200).json({
                    success: 'true',
                    message: 'comentarios encontrados',
                    data: coment
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Error comentarion no encontrados'
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los comentarios'
            });        
        }
    } 
}