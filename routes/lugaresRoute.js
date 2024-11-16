
const listLugaresContro = require('../controllers/lugaresController');

module.exports = (app) => {

    app.get('/api/listLugares/getAll', listLugaresContro.lugares);
}