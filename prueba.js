class Usuario{
    
    constructor(nombre, apellido, libros , mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }
    
    getFullName() {
        console.log(`${usuario1.nombre} ${usuario1.apellido} `);
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        console.log(this.mascotas.length);
    }

    addBook( nombre1 , autor1 ){
        this.libros.push( { nombre : nombre1 , autor : autor1 });
    }

    getBookNames(){
        let mapeo = this.libros.map( elemento =>{
        return elemento.nombre;
        })
        console.log(mapeo)
    }
}

const usuario1 = new Usuario("Frederik", "Baum", [] , [] );

usuario1.getFullName();
usuario1.addMascota("Juan Carlos");
usuario1.addMascota("Canela");
usuario1.countMascotas();
usuario1.addBook("Harry Potter y el principe mestizo" , "J.K.Rowling");
usuario1.addBook("El nombre del viento" , "Patrick Rothfuss");
usuario1.addBook("El corazón delator" , "Edgard Allan Poe");
usuario1.getBookNames();
