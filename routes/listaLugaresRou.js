
const listLugaresContro = require('../controllers/listLugaresContro');

module.exports = (app) => {

    app.get('/api/listLugares/getAll', listLugaresContro.getAll);
}