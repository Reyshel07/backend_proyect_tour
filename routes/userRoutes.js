
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {

    app.get('/api/users/getAll', userControllers.getAll);

    app.post('/api/users/create',userControllers.register);

    app.put('/api/users/update/:id', userControllers.update);

    app.post('/api/login/LoginByEmail', userControllers.login);

    app.post('/api/tour/Tour', userControllers.tourController);

    app.post('/api/users/loginInicial', userControllers.loginEmail );

    app.post('/api/users/login10', async (req, res) => {
        const {correo, contraseña} = req.body;

        try {
            const usuario = await db.query(
                `SELECT * FROM usuarios where correo = $1 and password = $2`,
                [correo, contraseña]
            );

            if (!usuario || usuario.length === 0) {
                return res.status(401).json({ error: 'Credenciales incorrectas'});
            }

            const usuairoEncontrado = usuario[0];

            const roles = await db.query(
                `SELECT r.nombre as rol, a.id, e.nombre as empresa_nombre
                FROM user_has_rol ur
                INNER JOIN rol r on ur.id_rol = r.id
                LEFT JOIN administracion a on a.id_usuario  = ur.id_user  and a.id_rol = ur.id_rol 
                LEFT JOIN empresa e on e.id = a.id_empresa 
                WHERE ur.id_user = $1
                `,
                [usuairoEncontrado.id]
            );

            if (roles.length > 1) {
                return res.json({
                    message: 'Seleecion un rol',
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
    })

}