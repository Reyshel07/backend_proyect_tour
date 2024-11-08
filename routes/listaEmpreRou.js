const listaEmpreContro = require('../controllers/listaEmpreContro');

module.exports = (app) =>{

    app.get('/api/listEmpre/getAll', listaEmpreContro.getAll);
}