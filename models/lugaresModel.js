const db = require('../config/config');
const ListLugares = {};

ListLugares.lugarM = () =>{
    const sql = `
    SELECT
    *
    FROM
    lugar
    `;
    return db.manyOrNone(sql);
}

ListLugares.buscarL = ()=>{
    
}

module.exports = ListLugares;