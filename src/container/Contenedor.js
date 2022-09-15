export class ContenedorSQL{
    constructor( tableName , knex ){
        this.knexCli = knex;
        this.tableName = tableName;
    }

    async listarAll(){
        try {
            return await this.knexCli.from(this.tableName).select('*').orderBy( 'id' , 'asc' );
        } catch (error) {
            throw error;
        }
    }

    async listar( id ){
        try {            
            return await this.knexCli.from(this.tableName).select('*').where( { id : id } );
        } catch (error) {
            throw error;
        }
    }

    async agregar( obj ){
        try {
            return await this.knexCli( this.tableName ).insert(obj);
        } catch (error) {
        console.log(error);
        throw error;
        }
    }

    async actualizar( id , objeto ){
        try {
            return await this.knexCli.from(this.tableName).where( { id : id } ).update( objeto );
        } catch (error) {
            throw error;
        }
    }

    async eliminar( id ){
        try {
            return await this.knexCli.from(this.tableName).where( { id : id }).del();
        } catch (error) {
            throw error;
        }
    }
    async cerrarConexion(){
        this.knexCli.destroy();
    }
}