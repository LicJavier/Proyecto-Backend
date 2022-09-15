import knex from "knex";
import { config } from "../utils/config.js";
import { config2 } from "../utils/config.js";

const knexCli = knex(config.db);
const knexCli2 =knex(config2.db) 

knexCli.schema.dropTableIfExists('productos')
    .then(()=>{
        knexCli.schema.createTable('productos', table =>{
            table.increments('id').primary();
            table.string('name', 50 ).notNullable();
            table.integer('price', 10 ).notNullable();
            table.string('img', 255 ).notNullable();
        })
            .then(()=>console.log('tabla creada'))
            .catch(err=> {console.log(err); throw(err);})
            .finally(()=>{
                knexCli.destroy();
            });
    })

knexCli2.schema.dropTableIfExists('mensajes')
    .then(()=>{
        knexCli2.schema.createTable('mensajes', table =>{
            table.increments('id').primary();
            table.string('author', 50 ).notNullable();
            table.string('mensaje', 255 ).notNullable();
            table.string('hora', 50 ).notNullable();
        })
            .then(()=>console.log('tabla creada'))
            .catch(err=> {console.log(err); throw(err);})
            .finally(()=>{
                knexCli2.destroy();
            });
})