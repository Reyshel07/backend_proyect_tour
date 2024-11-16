const listaEmpreContro = require('../controllers/empreContro');

module.exports = (app) =>{

    app.get('/api/listEmpre/getAll', listaEmpreContro.getAll);
}