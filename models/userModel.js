const db = require('../config/config');
const User = {};

//conecta con la base de datos , sentencias sql
User.getAll = () =>{
    const sql = `
    SELECT
    * 
    FROM
    usuarios
    `;
    return db.manyOrNone(sql);
}
User.findUserById = (id, callback) => {
    const sql =  `
    SELECT id, id_rol, name, email, tipo_login, fecha_creacion, password
    FROM usuarios
    WHERE id = $1;
    `;
    return db.oneOrNone(sql, id).then(user => {callback(null, user); });
}

User.create = (user) => {
    const myPasswordHadshed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHadshed;

    const sql = `
    INSERT INTO 
    usuarios(
       email,
       id_rol,
       name,
       password,
       tipo_login,
       fecha_creacion
    )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.id_rol,
        user.name,
        user.password,
        user.tipo_login,
        new Date()
    ]);
}

User.findUserByEmail = (email) => {
    const sql = `
    SELECT id, id_rol, name, email, tipo_login, password, session_token
    FROM usuarios
    WHERE email = $1;
    `;

    return db.oneOrNone(sql, [email]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHadshed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHadshed === hash) {
        return true;
    }
    return false;
}


User.update = (id, {
    nombre, correo, tipo_login, fecha_creacion, password
}) => {
    const sql =`
    UPDATE usuarios
    SET  nombre = $1, correo = $2, tipo_login = $3, fecha_creacion = $4, password = $5
    WHERE id = $6
    RETURNING id, nombre, correo, tipo_login, fecha_creacion, password; 
    `;
    return db.oneOrNone(sql,[nombre,correo, tipo_login, fecha_creacion, password])
}


/*User.findUserById = (id) => {
    const sql =  `
    SELECT id, id_rol, nombre, correo, tipo_login, fecha_creacion, password
    FROM usuarios
    WHERE id = $1;
    `;
    return db.oneOrNone(sql,[id]);
    
}*/

/*User.create = ({id_rol, nombre, correo, tipo_login, fecha_creacion, password, nrotelefono})=>{

/*User.login = (email)=>{
    const sql = `
    SELECT u.nombre, u.correo, u.password, r.nombre AS usuario 
    FROM usuarios u 
    JOIN rol r ON u.id_rol = r.id
    where u.correo = $1;
    `;
    return db.oneOrNone(sql, [email]);

}
User.loginInicial = (nombre, password) => {
    const sql = `
    SELECT r.nombre as rol, a.id_empresa, e.nombre as empresa_nombre
    FROM user_has_rol ur
    INNER JOIN rol r on ur.id_rol = r.id
    LEFT JOIN administracion a on a.id_usuario  = ur.id_user  and a.id_rol = ur.id_rol 
    LEFT JOIN empresa e on e.id = a.id_empresa 
    WHERE ur.id_user = $1
    `;
    [usuairoEncontrado.id]
    return db.oneOrNone(sql, [nombre, password]);

}
User.selectUser =(correo, password) =>{
    const sql = `
    SELECT * FROM 
    usuarios where 
    correo = $1 and password = $2`;
    return db.oneOrNone(sql,[correo, password]);
}
User.createTour = (nombre) => {
    const sql = `
    select e.nombre as nombre_empresa 
    from usuario u 
    join administracion a on u.id = a.id 
    join empresa e on a.id = e.id
    where e.nombre = $1 and password = $2;
    `
}*/

module.exports = User;