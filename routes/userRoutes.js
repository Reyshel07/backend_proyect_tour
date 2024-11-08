
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {

    app.get('/api/users/getAll', userControllers.getAll);

    app.post('/api/users/create',userControllers.create);

    app.put('/api/users/update/:id', userControllers.update);

}