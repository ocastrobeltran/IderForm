const express = require("express");
const mysql = require("mysql");
const app = express();

let conexion =mysql.createConnection({
    host: "localhost",
    database: "ider_reservas",
    user: "root",
    password: ""
})

app.set("view engine", "ejs"); // aca se utiliza el motor de visualizacion 

//Se manejan cuando vienen datos de una pagina
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", function(req, res){  
    res.render("IDER");
});

app.post("/validate", function(req, res){ //Validate es la accion del form en el html
    const datos = req.body;

        let nombre = datos.name; //aca definimos con el ID del input del form
        let apellido = datos.lastname;
        let cedula = datos.identification;
        let telefono = datos.phone;
        let correo = datos.email;
        let deporte = datos.sport;
        let fecha = datos.date;
        let escenario = datos.scenary;
        // let hora = datos.time;       //comentado mientras soluciono lo del js y css
        let terminos = datos.terms;

        //FALTA INTEGRAR LA HORA hasta solucionar lo del js y css
        //ACA INSERTAMOS EN LA TABLA LO VALRES MEDIANTE ESTA CONSULTA EN LA BD
        let registrar = "INSERT INTO reservas (name, lastname, identification, email, phone, sport, scenary, date, termns) VALUE ('"+nombre+"', '"+apellido+"', '"+cedula+"', '"+correo+"', '"+telefono+"', '"+deporte+"', '"+escenario+"', '"+fecha+"' , '"+terminos+"')";
        
        //Aca se realiza la conexion dando la consulta en la BD
        conexion.query(registrar, function(error){
            if(error){
                throw error;   //si hay error que me lo muestre
            } else {
                console.log("Datos almacenados correctamente");
            }
        });

    console.log(datos);
});

app.listen(3000, function() {
    console.log("Servidor en el puerto 3000");
});