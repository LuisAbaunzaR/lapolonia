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
            .save((error, alumo)=>{
                response
                .status(201)
                .send({
                
                    "mensaje": "Alumno creado exitosamente",
                    "body": alumo,
                    "error": error
                })


            })
 
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

    Alumno 
        .findByIdAndUpdate(
            alumnoId,
            {$set: req.body},
            {new: true}
        )
        .exec()
        .then( alumnoActualizado => {
            res.status(200).send(alumnoActualizado);
        })
        .catch( error => {
            res.status(400).send(`Error: ${error}`);
        });

})


//DELETE ->Delete One
app.delete('/api/alumnos/:id/',(req,res)=>{
    const alumnoId= req.params.id

    Alumno
        .findByIdAndRemove(alumnoId)
        .exec()
        .then( resultado => {
            res.status(204).send({
                "message": "Alumno eliminado exitosamente",
                "body": resultado
            })
        })
        .catch( error => {
            res.status(404).send(error)
        })



})  

//CRUD Cursos

//CREATE -> Post One Cursos

app.post('/api/cursos/', (request, response) => {
    let json = request.body
   // response.send('Hiciste POST en /api/alumnos/');
   const cursoNuevo = Curso(json);

   cursoNuevo
       .save( (error, curso) => {
           response
               .status(201)
               .send({
                   "menssage": "Curso creado exitosamente",
                   "body": curso
               });
       })

   
});

//READ ->Get All CURSOS
app.get('/api/cursos/', (request, response) => {
    Curso
   .find()
   .exec()
   .then( cursos => {
       response.status(200).send({
           "message": "Lista de cursos obtenida exitosamente",
           "body": cursos
       });
   })
   .catch( error => {
       response.status(404).send(error);
   })
});


//READ ->Get One CURSOS
app.get('/api/cursos/:id/',(req,res)=>{
    const cursoId = req.params.id;

    Curso
        .findById(cursoId)
        .exec()
        .then( curso => {
            res
              .status(200)
              .send({
                message: "Curso hallado exitosamente",
                body: curso
              });
        })
        .catch( error => {
            res.status(404).send(error);
        })
})

//UPDATE -> Put One CURSOS /////
app.put('/api/cursos/:id/',(req,res)=>{
    const cursoId = req.params.id;

    Curso
        .findByIdAndUpdate(
            cursoId,
            { $set: req.body },
            { new: true }
        )
        .exec()
        .then(cursoActualizado => {
            res.status(200).send(cursoActualizado);
        })
        .catch(error => {
            res.status(400).send(`Error: ${error}`);
        });
})


//DELETE ->Delete One
app.delete('/api/cursos/:id/',(req,res)=>{
    const cursoId = req.params.id;

    Curso
        .findByIdAndRemove(cursoId)
        .exec()
        .then(resultado => {
            res.status(204).send({
                "message": "Curso eliminado exitosamente",
                "body": resultado
            })
        })
        .catch(error => {
            res.status(404).send(error)
        })


})  





// use port 3000 unless there exists a preconfigured port
//var PORT = process.env.port || 8801;
.listen(process.env.PORT || 5000)

// app.listen(PORT,()=>{
//     console.log(`Servidor Corriendo en el puerto ${PORT}`)
// })



