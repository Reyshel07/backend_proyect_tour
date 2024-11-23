const listaEmpreContro = require('../controllers/empreContro');

module.exports = (app) =>{

    app.get('/api/listEmpre/getAll', listaEmpreContro.getAll);

    app.post('/api/listEmpre/searchTourEm', listaEmpreContro.searchTourEm);

    app.post('/api/listEmpre/getComent', listaEmpreContro.getAllComentC);
}