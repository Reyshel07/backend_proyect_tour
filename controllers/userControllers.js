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

    async register(req, res, next){
        try {
            const user = req.body;
            const data = await User.create(user);

            return res.status(201).json({
                succes: true,
                message: 'El registro se realizo correctamente',
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                succes: false,
                message: 'Hubo un error con el regsitro de usuario',
                error: error
            });
        }
    },

    async login(req, res, next){
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findUserByEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    succes: false,
                    message: 'El email no fue encontrado'
                })
            }

            if(User.isPasswordMatched(password, myUser.password)){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 hora
                    // expiresIn: (60*5) // 5 min
                });

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    email: myUser.email,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    succes: true,
                    data: data,
                    message: "El usuario ha sido autenticado"
                });
            } else {
                return res.status(401).json({
                    succes: false,
                    message: 'La contraseña no coincide'
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                succes: false,
                message: 'Error al hacer login',
                error: error
            })
        }
    },

    async loginByEmail(req, res){
        try {
            const {email, password} = req.body;
            const user = await User.findUserByEmail(email);

            if (user && user.contrasena === password) {
                return res.status(200).json({
                    succes: true,
                    message: "Usuario autentificasddsaasddasmasdsado",
                    data: user
                })
            } else {
                return res.status(401).json({
                    succes: false,
                    message: "Correo o contrasena no encontrados",
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

    async tourController (req, res, next){
        try {
            const {nombre}  = req.body;
            const newTour = await User.createTour(nombre);
            return res.status(200).json({
                success: true,
                message: 'exitoso'
            })
        } catch (error) {
            
        }
    },
     
    /*async create(req, res, next){
        try {
            const {id_rol, nombre, correo, tipo_login, fecha_creacion, password, nrotelefono} = req.body;
            const newUser = await User.create({id_rol, nombre, correo, tipo_login, fecha_creacion, password, nrotelefono});
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

    
    async LoginByEmail(req, res, next){
        try {
            const {email, password} = req.body;
            const newlogin = await User.login(email);
            if (newlogin && newlogin.password === password) {
                console.log(`Cuenta verificada: ${newlogin}`);
                return res.status(200).json({
                    success: true,
                    message: 'usuario encontrado',
                    data: newlogin
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no encontrado'
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al buscar la cuenta'
            })
        }

    },
    
    async loginEmail (req, res, next){
        try {
            const{nombre, password}= req.body;
            const usuario = await User.selectUser(nombre, password);
            if (!usuario || usuario.length === 0) {
                return res.status(400).json({error: 'credenciales incorrectas'});

            }

            const usuarioEncontrado = usuario[0];

            const roles = await User.loginInicial(nombre, password);
            if (roles.length > 1 ) {
                return res.json({
                    message: 'Seleccione un rol',
                    roles: roles
                });
            }

            const rol = roles[0].rol;
            const empresaID = roles[0].id_empresa;
            const empresaNombre = roles[0].empresa_nombre;

            res.json({
                message: 'Inicio de sesion exitoso',
                rol: rol,
                idempresa: empresaID,
                empresaNombre: empresaNombre || null
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "error en el servidor"
            })
        }
    },*/


}
