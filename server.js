const express = require('express');
const app = express();
const users = require('./routes/userRoutes');
const listEmpre = require('./routes/empreRoute');
const listLugares = require('./routes/lugaresRoute');
const listTour = require('./routes/tourRoute');
const passport = require('passport');
const session = require('express-session');
//const session = require('express-session');



//Middleware
app.use(express.json());
app.use(session({
    secret: '9sl7OG1$ZH{q>X=%s;Oum.KmLP9[dd^Q%A^KFWg4i|J)[IT&}fgdl4J(cUT*GK',  
    resave: false,               // Evita guardar la sesión si no ha cambiado
    saveUninitialized: true,     // Guarda las sesiones no inicializadas
    cookie: { secure: false }    // Cambia a `true` si estás usando HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);


users(app);
listEmpre(app);
listLugares(app);
listTour(app);



const port = 3000;


app.listen(port, ()=> {
    console.log('Servidor levantado correctamente');
});


