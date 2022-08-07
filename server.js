const express = require('express');
const Productos = require("./manejoDeArchivos.js")

const app = express();

const productos = new Productos("./DB/productos.txt");

function random(min, max) {
    let resultado = Math.floor((Math.random() * (max - min + 1)) + min);
    return resultado
}

app.get('/', (req, res)=>{
    res.send("Bienvenidos las rutas son: /productos o /productoRandom");
})

app.get('/productos', async ( req , res )=>{
    res.send(await productos.getAll());
}
);

app.get('/productoRandom', async ( req , res )=>{
    res.send(await productos.getById(random(0,6)));
}
);
app.get('*', ( req , res )=>{
    res.send("Error 404:    Página no encontrada D:");
}
);

const port = 8080;

const server = app.listen(port, ()=> {
    console.log(`Server on http://localhost:${port}`)
}
)