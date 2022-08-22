//----------------------------------------------------------------------------------------------
//------------------------------------MODULOS---------------------------------------------------
//----------------------------------------------------------------------------------------------
const express = require('express');
const expressHandlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

//----------------------------------------------------------------------------------------------
//-------------------------INSTANCIA DE SERVER--------------------------------------------------
//----------------------------------------------------------------------------------------------
const app = express();

// const routerProductos = require('./src/routes/productos.routes.js')
//----------------------------------------------------------------------------------------------
//------------------------------MIDDLEWARES-----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// app.use(express.static( 'public' ));
// app.use('/api/productos', routerProductos);
//----------------------------------------------------------------------------------------------
//---------------------------------MOTOR DE PLANTILLA-------------------------------------------
//----------------------------------------------------------------------------------------------
app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
// app.use('/api/productos', routerProductos);

//----------------------------------------------------------------------------------------------
//--------------------------------BASE DE DATOS-------------------------------------------------
//----------------------------------------------------------------------------------------------
const DB_PRODUCTOS = [/*{
    name:"Una mandala",
    price: 500,
    img:"https://cdn4.iconfinder.com/data/icons/abstract-ecology-flowers/512/4-512.png"
}*/
];
//----------------------------------------------------------------------------------------------
//-------------------------------------RUTAS----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.get('/productos', (req, res)=>{
    res.render('home', {DB_PRODUCTOS} );
})

app.post('/productos', (req, res)=>{
    DB_PRODUCTOS.push(req.body);
    res.redirect("/productos")
})
//----------------------------------------------------------------------------------------------
//---------------------------------------SERVIDOR-----------------------------------------------
//----------------------------------------------------------------------------------------------
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`escuchando en ${PORT}`)
})
server.on('error', error=>{
    console.error(`Error en el servidor${error}`);
});
// function random(min, max) {
//     let resultado = Math.floor((Math.random() * (max - min + 1)) + min);
//     return resultado
// }

