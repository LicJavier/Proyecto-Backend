//----------------------------------------------------------------------------------------------
//------------------------------------MODULOS---------------------------------------------------
//----------------------------------------------------------------------------------------------
import express from 'express';
import expressHandlebars from 'express-handlebars';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
import moment from 'moment';
import { fileURLToPath } from 'url';
import { ContenedorSQL } from './src/container/Contenedor.js';
import knex from 'knex';
import { config, config2 } from './src/utils/config.js';

const apiProductos = new ContenedorSQL('productos', knex(config.db));
const apiMensajes = new ContenedorSQL('mensajes', knex(config2.db));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
moment.locale('es')
const hoy = moment();

//----------------------------------------------------------------------------------------------
//-------------------------INSTANCIA DE SERVER--------------------------------------------------
//----------------------------------------------------------------------------------------------
const app = express();
const httpServer = createServer(app);
//----------------------------------------------------------------------------------------------
//------------------------------MIDDLEWARES-----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

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


//----------------------------------------------------------------------------------------------
//--------------------------------BASE DE DATOS-------------------------------------------------
//----------------------------------------------------------------------------------------------
const DB_PRODUCTOS = [];
const DB_MENSAJES = [];

//----------------------------------------------------------------------------------------------
//-------------------------------------RUTAS----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.get('/', async ( req , res )=>{
    if (DB_MENSAJES.length == 0) {
        const msj = await apiMensajes.listarAll();
        const losMsj = msj.map((p)=>{
            DB_MENSAJES.push(p)
        })
    }
    await  apiProductos.cerrarConexion();
    await apiMensajes.cerrarConexion();
    res.render('home', { DB_PRODUCTOS });
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

const io = new Server(httpServer);
io.on('connection', (socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`);

    socket.emit('from server saludo', 'Saludo desde el Server');
    
    io.sockets.emit('from server msj', DB_MENSAJES)
    socket.on('from-cliente-msj', async (data)=>{
        const newData = {...data, hora:`${hoy.format('Do MMMM YYYY, h:mm:ss a')}` };
        DB_MENSAJES.push(newData);
        await apiMensajes.agregar(newData);
        await apiMensajes.cerrarConexion();
        io.sockets.emit('from server msj',newData);
    })
})

httpServer.listen( `${PORT}` );