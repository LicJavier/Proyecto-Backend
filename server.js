//----------------------------------------------------------------------------------------------
//------------------------------------MODULOS---------------------------------------------------
//----------------------------------------------------------------------------------------------
const express = require('express');
const expressHandlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const { Server:HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const moment = require('moment');
moment.locale('es')
const hoy = moment();
const Mensaje = require('./public/scripts/manejoDeArchivos.js');
const { json } = require('express');
const { fstat } = require('fs');
const mensaje = new Mensaje('./DB/mensajes.txt')
//----------------------------------------------------------------------------------------------
//-------------------------INSTANCIA DE SERVER--------------------------------------------------
//----------------------------------------------------------------------------------------------
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// const routerProductos = require('./src/routes/productos.routes.js')
//----------------------------------------------------------------------------------------------
//------------------------------MIDDLEWARES-----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// app.use(express.static(path.join(__dirname, 'views')));
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
const DB_MENSAJES = [/*{author:"Pepe@pepe", mensaje:"hola Juan Carlos"},{author:"JuanCarlos@juanCarlos", mensaje:"¿Cómo estas?"}*/];

//----------------------------------------------------------------------------------------------
//-------------------------------------RUTAS----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.get('/', async ( req , res )=>{
    if (DB_MENSAJES.length == 0) {
        const msj = await mensaje.getAll();
        const losMsj = msj.map((e)=>{
            DB_MENSAJES.push(e)
        })
    }
    res.render('home', {DB_PRODUCTOS});
})

app.post('/productos', async (req, res)=>{
    DB_PRODUCTOS.push(req.body);
    io.sockets.emit('update-producto' , req.body);
    res.redirect("/");
})
//----------------------------------------------------------------------------------------------
//---------------------------------------SERVIDOR-----------------------------------------------
//----------------------------------------------------------------------------------------------
const PORT = 8080;
// const server = app.listen(PORT, ()=>{
//     console.log(`escuchando en ${PORT}`)
// })
// server.on('error', error=>{
//     console.error(`Error en el servidor${error}`);
// });

httpServer.listen(PORT, () => console.log(`escuchando en ${PORT}`));
io.on('connection', (socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`);

    socket.emit('from server saludo', 'Saludo desde el Server');
    
    io.sockets.emit('from server msj', DB_MENSAJES)
    socket.on('from-cliente-msj', async (data)=>{
        const newData = {...data, hora:`${hoy.format('Do MMMM YYYY, h:mm:ss a')}` };
        DB_MENSAJES.push(newData);
        await mensaje.save(newData)
        io.sockets.emit('from server msj',newData);
    })
})

// function random(min, max) {
//     let resultado = Math.floor((Math.random() * (max - min + 1)) + min);
//     return resultado
// }

