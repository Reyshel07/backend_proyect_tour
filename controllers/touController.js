const tour = require('../models/tourModels');

module.exports = {

    async getAll(req,res,next){
        try {
            const getAllTour = await tour.getTour();
            if (getAllTour) {
                console.log(`Tours: ${getAllTour}`);
                return res.status(200).json(getAllTour);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los tours'
            });
        }
    },

    async createTourC(req, res, next){
        try {
            const Tour = req.body;
            const data = await tour.createTour(Tour);
            console.log(data);
            if (data) {
                console.log(`Tour creado: ${data}`);
                return res.status(200).json({
                    success: 'true',
                    message: 'Tour creado exitosamente',
                    data: data
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Error tour no creado'
                })
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al crear el tour'
            })
            
        }
    },

    async updateTour (res, req, next){
        try {
            const {id} = req.parems;
            const {id_categoria, nombre, descripcion, precio, disponibilidad, imagen, que_incluye, que_no_incluye, oferta, oferta_2x1, id_depart, categoria_tour, descripcion_uno } = req.body;
            const updateTour = await tour.update(id, {id_categoria, nombre, descripcion, precio, disponibilidad, imagen, que_incluye, que_no_incluye, oferta, oferta_2x1, id_depart, categoria_tour, descripcion_uno});
            if (updateTour) {
                console.log(`Datos actualizados: ${updateTour}`);
                return res.status(200).json({
                    success: true,
                    message: 'Datos actializados exitosamente',
                    data: updateTour
                });
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Tour no encontrado'
                });
            }
        
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar los datos'
            });
        }
    },

    async deleteTourById(req, res, next){
        try {
            const {id} = req.params;
            const deleteTour = await tour.delete(id);
    
            if (deleteTour) {
                console.log('Tour eliminado');
                return res.status(200).json({
                    success: true,
                    message: 'Tour eliminado exitosamente',
                    data: deleteTour
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Tour no econtrado'
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar un Tour'
            })
        }
    },

    async searchTourC (res, req, next){
        try {
            const {nombre} = req.body;
            const search = await tour.searchTour(t.nombre);
            if (search && search.t.nombre == nombre) {
                return res.status(201).json({
                    success: true,
                    message: 'Tour encontrado',
                    data: search
                })
            }else{
                return res.status(401).json({
                    success: true,
                    message: 'tour no encontrado'
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al buscar el tour'
            })
        }
    },

    async getAllComentTC(req, res, next){
        try {
            const coment = await tour.getAllComentT();

            console.log(`Comentarios: ${coment}`);
            return res.status(200).json(coment);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los comentarios'
            });        
        }
    } 
        
}