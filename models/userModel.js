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

User.findUserById = (id) => {
    const sql =  `
    SELECT id, id_rol, nombre, correo, tipo_login, fecha_creacion, password
    FROM usuarios
    WHERE id = $1;
    `;
    return db.oneOrNone(sql,[id]);
    
}

User.create = ({id_rol, nombre, correo, tipo_login, fecha_creacion, password})=>{
    const sql = `
    INSERT INTO usuarios (id_rol, nombre, correo, tipo_login, fecha_creacion, password)
    VALUES (1, $2, $3, $4, $5, $6, NOW())
    RETURNING id_rol, nombre, correo, tipo_login, fecha_creacion, password;
    ';
    `
    return db.one(sql, [id_rol, nombre, correo, tipo_login, fecha_creacion, password]);
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

module.exports = User;