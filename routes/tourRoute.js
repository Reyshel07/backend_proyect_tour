const tourController = require('../controllers/touController');

module.exports = (app) => {

    app.get('/api/listTour/getAll', tourController.getAll);

    app.post('/api/listTour/create', tourController.createTourC);

    app.put('/api/listTour/update', tourController.updateTour);

    app.delete('/api/listTour', tourController.deleteTourById);

    app.post('/api/listTour/searchTour', tourController.searchTourC);

    app.get('/api/listTour/getComentT', tourController.getAllComentTC);
}