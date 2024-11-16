const express = require('express');
const app = express();
const users = require('./routes/userRoutes');
const listEmpre = require('./routes/empreRoute');
const listLugares = require('./routes/lugaresRoute');
const passport = require('passport');


//Middleware
app.use(express.json());

app.use(passport.initialize());

require("./config/passport")(passport);


users(app);
listEmpre(app);
listLugares(app);



const port = 3000;


app.listen(port, ()=> {
    console.log('Servidor levantado correctamente');
});


