const User = require('../models/userModel');

module.exports = {
    async getAll(req, res, next){
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                massage: 'Error al obtener los datos'
            });
        }
    },
    
    async create(req, res, next){
        try {
            const {id_rol, nombre, correo, tipo_login, fecha_creacion, password} = req.body;
            const newUser = await User.create({id_rol, nombre, correo, tipo_login, fecha_creacion, password});
            if (newUser) {
                console.log(`Cuenta creada: ${newUSer}`);
                return res.status(200).json({
                    success: 'true',
                    message: 'Cuenta creada exitosamente',
                    data: newUser
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Error cuenta no creada'
                })
            }
        } catch (error) {
            console.log.apply(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al crear la cuenta'
            })
        }
    },

    async update(req, res, next){
        try {
            const {id} = req.parems;
            const {nombre, correo, tipo_login, fecha_creacion, password} = req.body;
            const updatedUser = await User.update(id, {nombre, correo, tipo_login, fecha_creacion, password});
            if (updatedUser) {
                console.log(`Datos actualizados; ${updatedUser}`);
                return res.status(200).json({
                    success: true,
                    message: 'Datos actualizados exitosamente',
                    data: updatedUser
                });
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'usuario no encontrado'
                });
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: 'Error al actualizar los datos'
            });
        }
    },
}