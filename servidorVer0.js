const express = require('express');
const bodyParser = require('body-parser');
//const clienteMongo = require('./clienteMongo.js')
//console.log(clienteMongo)
const {Alumno,Curso}= require ('./clienteMongo.js')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// CRUD Alumnos
//CREATE -> Post One

app.post('/api/alumnos/', (request, response) => {
    let jsonCliente = request.body
   // response.send('Hiciste POST en /api/alumnos/');

//    const nuevoAlumno = Alumno({

//     nombres: json.nombres,
//     apellidos: json.apellidos,
//     sexo: json.sexo,
//     edad: json.edad

//    })
const nuevoAlumno = Alumno(jsonCliente) // se trae todo el json en lugar de tener que poner todos los nombre, app,sex etc
   
   nuevoAlumno
            .save((error, alumno)=>{
                response
                .status(201)
                .send({
                
                    "mensaje": "Alumno creado exitosamente",
                    "body": alumno,
                    "error": error
                })

            })
          //  .exec()
         //   .then()
         //   .catch()



    response.status(201)
            .send({
                
                    "mensaje": "Alumno creado exitosamente",
                    "cuerpo": jsonCliente
                });
});

// app.get('/api/alumnos/', (request, response) => {
//     response.send('Hiciste GET en /api/alumnos/');
// });


//READ ->Get All
app.get('/api/alumnos/', (request, response) => {

    Alumno
        .find()
        .exec()
        .then(jsonresultado => {
            response.status(200)
            .send({
                "message":"lista de alumnos obtenida exitosamente",
                "body": {jsonresultado},
                
            });
        })
        .catch(error => console.log(error))

    
});


//READ ->Get One
app.get('/api/alumnos/:id/',(req,res)=>{
   // res.send(req.params)
   const alumnoId= req.params.id;
        // pedir a la base de datos el alummno con id =alumnoId
        //mandarle al cliente el alumno con el id solicitado 

        Alumno
            .findById(alumnoId)
            .exec()
            .then( alumno =>{
                res.status(200).send(alumno)
                
            })
            .catch(error=>{
                res.status(404).send(error)
            })

    // res.status(200).send({
    //     "message":"Alumno hallado existosamente",
    //     "body": {"nombre":"luis abaunza"}
    // })

})



//UPDATE -> Put One
app.put('/api/alumnos/:id/',(req,res)=>{
    const alumnoId= req.params.id

//pediria a la base de datos que actualice el alumno con el id=alumnoId
//mostraria al cliente los datos del alumno modificado

    res.status(200).send({
        "message":"Alumno modificado existosamente",
        "body": {"nombre":"nombre de Alumno modificado"}
    })
})


//DELETE ->Delete One
app.delete('/api/alumnos/:id/',(req,res)=>{
    const alumnoId= req.params.id

    // pediria a la base de datos que borre al alumno con el id=alumnoid
    // responderia al cliente si su petcion se proceso correctamente 
    res.status(204).send({
        "message":"Alumno eliminado existosamente",
        "body": {}
    })


})  

//CRUD Cursos

//CREATE -> Post One Cursos

app.post('/api/cursos/', (request, response) => {
    let json = request.body
   // response.send('Hiciste POST en /api/alumnos/');

    //Cosas magicas
    //jsonResultado -> res.send(jsonResultado)



    response.status(201)
            .send({
                
                    "mensaje": "Curso creado exitosamente",
                    "cuerpo": json
                });
});

//READ ->Get All CURSOS
app.get('/api/cursos/', (request, response) => {
    response.status(200).send({
        "message":"lista de cursos obtenida exitosamente",
        "body": {"curso":"DEV"}
    });
});


//READ ->Get One CURSOS
app.get('/api/cursos/:id/',(req,res)=>{
   // res.send(req.params)
   const cursoId= req.params.id;
        // pedir a la base de datos el curso con id =cursoId
        //mandarle al cliente el curso con el id solicitado 

    res.status(200).send({
        "message":"curso hallado existosamente",
        "body": {"nombre":"Math"}
    })

})

//UPDATE -> Put One CURSOS /////
app.put('/api/cursos/:id/',(req,res)=>{
    const cursoId= req.params.id

//pediria a la base de datos que actualice el curso con el id=cursoId
//mostraria al cliente los datos del alumno modificado

    res.status(200).send({
        "message":"curso modificado existosamente",
        "body": {"nombre":"Data"}
    })
})


//DELETE ->Delete One
app.delete('/api/cursos/:id/',(req,res)=>{
    const cursoId= req.params.id

    // pediria a la base de datos que borre al alumno con el id=cursoid
    // responderia al cliente si su petcion se proceso correctamente 
    res.status(204).send({
        "message":"Curso eliminado existosamente",
        "body": {}
    })


})  





// use port 3000 unless there exists a preconfigured port
var PORT = process.env.port || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`)
})



