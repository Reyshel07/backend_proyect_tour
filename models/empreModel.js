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
module.exports = ListEmpre;