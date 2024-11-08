const express = require('express');
const app = express();
const users = require('./routes/userRoutes');


//Middleware
app.use(express.json());


users(app);



const port = 3000;


app.listen(port, ()=> {
    console.log('Servidor levantado correctamente');
});


