const db = require('../config/config');
const ListEmpre = {};

ListEmpre.getAll = () => {
    const sql = `
    SELECT
    *
    FROM
    empresa
    `;
    return db.manyOrNone(sql);
}