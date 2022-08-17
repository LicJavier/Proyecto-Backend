const express = require('express');
const routerProductos = express.Router();
const Productos = require("../scripts/manejoDeArchivos")
//----------------------------------------------------------------------------------------------
//---------------------------------------DATA BASE----------------------------------------------
//----------------------------------------------------------------------------------------------
const productos = new Productos("./DB/productos.txt");

const DB_PRODUCTOS = [];

routerProductos.use(async ( req , res , next )=>{
    if (DB_PRODUCTOS.length === 0) {
        DB_PRODUCTOS.push(await productos.getAll());
    }
    console.log("primero paso por aca");
    next()
})

routerProductos.get('/',( req , res )=>{
    res.status(200).json(DB_PRODUCTOS);
});

routerProductos.get('/:id', async ( req , res )=>{
    let id = req.params.id;
    let productId = extraerProducto(parseInt(id));
    let condicional = DB_PRODUCTOS[0].findIndex(e=>e.id == id);
    condicional === -1 ? res.status(404).json({error: 'El producto no se encontro'}) 
    :res.status(200).json(productId);
});

routerProductos.post('/', async ( req , res )=>{
    console.log(req.body);
    let productoNuevo = await productos.save(req.body);
    DB_PRODUCTOS.push(req.body);
    res.status(201).json({msg: "Producto agregado", data: req.body, id: productoNuevo });
});

routerProductos.put('/:id', async ( req , res )=>{
    let id = req.params.id;
    let productId = await productos.putObject(req.body,id)
    DB_PRODUCTOS[0].push(productId);
    res.status(201).json({msg: "Producto modificado", data: productId, id: id });
});

routerProductos.delete('/:id', async ( req , res )=>{
    let id = req.params.id;
    let productId = await productos.deleteById(parseInt(id));
    DB_PRODUCTOS.splice(DB_PRODUCTOS.findIndex(e=>e.id == id),1)
    res.status(202).json({"producto eliminado": productId});
});

function extraerProducto(params) {
    let producto = DB_PRODUCTOS[0].filter(element=> element.id === params);
    return producto;
}


module.exports = routerProductos;