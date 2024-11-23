const db = require('../config/config');
const ListEmpre = {};

ListEmpre.getAllEmpre = () => {
    const sql = `
    SELECT
    *
    FROM
    empresa 
    `;
    return db.manyOrNone(sql);
}

ListEmpre.getTourEmpre  = (nombre) =>{
    const sql = `
    SELECT 
        e.*,          
        t.*            
    FROM 
        empresa e 
    JOIN 
        tour t 
    ON 
        e.id_tour = t.id 
    WHERE 
        e.nombre = $1;
    `;
    return db.any(sql,[nombre]);
}
ListEmpre.creatComent = (Coment) => {
    const sql = `
    INSERT INTO opinion_empre 
    (id_usuario, id_empre, comentario, valoracion)
    VALUES($1, $2, $3, $4) RETURNING id
    `
    return db.one(sql,[
        Coment.id_usuario,
        Coment.id_empre,
        Coment.comentario,
        Coment.valoracion
    ]);
}
ListEmpre.getAllComent = (nombre)=>{
    const sql = `
    SELECT u.name, o.comentario, o.valoracion ,o.id_empre ,o.fecha, e.nombre 
    FROM opinion_empre o
    JOIN usuarios u ON o.id_usuario = u.id
    join empresa e on o.id_empre  = e.id 
    where e.nombre = $1;
    `;
    return db.any(sql,[nombre]);
}
module.exports = ListEmpre;