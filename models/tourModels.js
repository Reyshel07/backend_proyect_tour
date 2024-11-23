const db = require('../config/config');
const tour = {};

tour.getTour = ()=> {
    const sql = `
    SELECT 
    *
    FROM
    tour t
    `;
    return db.manyOrNone(sql);
}

tour.createTour = (tour) => {
    const sql = `
    INSERT INTO 
    tour (
       id_categoria,
       nombre ,
       descripcion ,
       precio,
       disponibilidad,
       imagen,
       que_incluye,
       que_no_incluye ,
       oferta,
       oferta_2x1,
       id_depart,
       categoria_tour,
       descripcion_uno
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING nombre`;
    return db.oneOrNone(sql,[
        tour.id_categoria,
        tour.nombre,
        tour.descripcion ,
        tour.precio,
        tour.disponibilidad,
        tour.imagen,
        tour.que_incluye,
        tour.que_no_incluye ,
        tour.oferta,
        tour.oferta_2x1,
        tour.id_depart,
        tour.categoria_tour,
        tour.descripcion_uno
    ]);
}

tour.update=(id,{
    id_categoria, nombre, descripcion, precio, disponibilidad, imagen, que_incluye, que_no_incluye, oferta, oferta_2x1, id_depart, categoria_tour, descripcion_uno
})=>{
    const sql = `
    UPDATE tour
    SET id_categoria = $1, nombre = $2, descripcion = $3,
    precio = $4, disponibilidad = $5, imagen = $6, que_incluye = $7,
    que_no_incluye = $8, oferta = $9, oferta_2x1 = $10, id_depart = $11,
    categoria_tour = $12, descripcion_uno = $13,
    WHERE id = $14,
    RETURNING id, id_categoria, nombre , descripcion , precio,
    disponibilidad, imagen, que_incluye, que_no_incluye , oferta,
    oferta_2x1, id_depart, categoria_tour, descripcion_uno
    `;
    return db.oneOrNone(sql, [id_categoria, nombre, descripcion, precio, disponibilidad, imagen, que_incluye, que_no_incluye, oferta, oferta_2x1, id_depart, categoria_tour, descripcion_uno ])
}

tour.delete = (id) => {
    const sql = `
    DELETE FROM tour
    WHERE id = $1
    RETURNING  id;
    `;

    return db.oneOrNone(sql, [id]);
}

tour.searchTour = (t) => {
    const sql = `
    SELECT 
        e.nombre AS empresa, 
        e.descripcion AS descripcion_empresa, 
        t.nombre AS tour, 
        t.precio, 
        t.descripcion AS descripcion_tour, 
        t.que_incluye,
        t.disponibilidad,
        t.imagen,
        t.que_no_incluye,
        t.oferta,
        t.oferta_2x1,
        t.id_categoria,
        t.descripcion_uno,
        t.categoria_tour,
        t.id_depart 
    FROM 
        empresa e 
    JOIN 
        tour t 
    ON 
        e.id_tour = t.id -- Ahora conectamos usando id_tour
    WHERE 
        t.nombre = $1
    `;
    return db.any(sql,[t.nombre]);
}
tour.getAllComentT = ()=>{
    const sql = `
    SELECT u.name, o.comentario, o.valoracion ,o.id_tour ,o.fecha 
    FROM opinion o
    JOIN usuarios u ON o.id_usuario = u.id;
    `;
    return db.any(sql,);
}

module.exports = tour;