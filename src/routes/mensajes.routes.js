const express = require('express');
const Mensaje = require('../../public/script.js');
const routerMensaje = express.Router();

//----------------------------------------------------------------------------------------------
//---------------------------------------DATA BASE----------------------------------------------
//----------------------------------------------------------------------------------------------
const mensaje = new Mensaje("./DB/mensajes.txt");

const DB_MENSAJE = [];
