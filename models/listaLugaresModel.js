const db = require('../config/config');
const ListLugares = {};

ListLugares.getAll = () =>{
    const sql = `
    SELECT
    *
    FROM
    lugar
    `;
    return db.manyOrNone(sql);
}